# Backend Architecture Plan

## Purpose

This document defines the backend architecture for the Spiceroad Platform.

The platform is not only a shop for static downloadable files. It is a customer-specific digital-product delivery platform where server owners can:

- register and manage partner accounts
- buy products or claim free gated resources
- upload branded assets and configuration details
- pay for one-time products or subscriptions
- receive generated deliverables such as launchers, installers, or customized packages
- download private artifacts from their dashboard

The backend must therefore support:

- authentication and authorization
- database persistence
- product catalog and order handling
- file upload and private download
- payments and subscriptions
- entitlement-based access control
- GitHub integration for source-code-backed product builds
- build orchestration and customer-specific deliverables
- admin review and operational workflows

---

## Recommended Stack

```text
Frontend:
  Astro + Lit, built to static output and hosted through GitHub Pages

Backend:
  ASP.NET Core Web API

Database:
  SQL Server / MSSQL

Data Access:
  EF Core for platform-owned data
  Dapper/raw SQL only if future legacy/game DB integration is ever required

File Storage:
  S3-compatible object storage

Payments:
  Payment provider abstraction
  Crypto provider first if desired
  Stripe/cards/manual payment later if needed

Access Control:
  Entitlements-based access model

Build System:
  GitHub App + GitHub Actions workflows
```

---

## High-Level Architecture

```text
platform.spiceroad.online
  Static Astro frontend hosted by GitHub Pages

api.spiceroad.online
  ASP.NET Core Web API backend

SQL Server
  Platform business database

S3-compatible object storage
  Customer uploads
  Build configuration files
  Generated deliverables
  Private downloadable resources

GitHub private repositories
  Source code for digital products
  Launcher, installer, tooling, templates, build scripts

GitHub Actions
  Build customer-specific products from source + uploaded customer assets/configuration
```

The platform backend is the orchestrator.

GitHub stores source code and runs builds.
Object storage stores customer uploads and generated outputs.
SQL Server stores business state and permissions.
The frontend calls the backend, never GitHub or storage directly for privileged operations.

---

## Core Principle: Entitlements First

Product access should not be determined directly by payments, subscriptions, or file links.

Instead, the central question is:

> What is this user entitled to access?

Use an entitlement model for everything:

- paid one-time product
- active subscription
- free gated resource
- admin-granted access
- custom deliverable
- generated launcher/installer output

Recommended flow:

```text
Payment / subscription / free claim / admin grant
  -> Entitlement
  -> Download permission / product access
```

This keeps paid downloads, free downloads, subscriptions, manual grants, and custom services consistent.

---

## Core Product Model

The platform should model products in a way that supports both normal downloads and generated deliverables.

### Product Types

Initial product/service categories:

- installer
- installer subscription
- launcher
- launcher subscription
- customization services
- graphic design services
- free gated resources

### Delivery Types

```text
StaticDownload
  Existing file/resource available after entitlement check

GeneratedBuild
  Customer uploads assets/details and receives a generated deliverable

ManualService
  Customer submits request, admin reviews/quotes/delivers manually

SubscriptionAccess
  Active subscription grants access to updates, recurring service, or private assets
```

---

## Generated Product Flow

Products like custom launchers and installers should not be treated as normal downloads.

They should be modeled as build orders:

```text
Product
  -> Order
  -> Intake
  -> Build Job
  -> Artifact / Deliverable
  -> Entitlement
  -> Download
```

Example launcher flow:

1. Customer buys a custom launcher product.
2. Platform creates an order.
3. Customer uploads branded assets and enters server details:
   - logo
   - server name
   - server website
   - server host/IP/domain
   - patch URL
   - Discord/social links
   - theme preferences
4. Backend stores uploads in object storage.
5. Backend writes a build configuration JSON file to object storage.
6. Backend triggers a GitHub Actions workflow in the product source repository.
7. GitHub Actions checks out the source code.
8. GitHub Actions fetches build config and customer assets.
9. GitHub Actions builds the launcher/installer.
10. GitHub Actions uploads the generated artifact back to object storage.
11. GitHub Actions calls the backend callback endpoint.
12. Backend marks the build job complete.
13. Backend creates a deliverable/download asset.
14. Customer downloads the private artifact from the dashboard.

---

## GitHub Integration

### Recommended Integration Method

Use a **GitHub App**, not a long-lived personal access token.

Reasons:

- scoped permissions
- install only on selected Spiceroad repositories
- not tied to a personal GitHub account
- better auditability
- safer rotation
- more production-ready security model

### Triggering Builds

Use GitHub Actions workflow dispatch for product builds.

Backend calls the GitHub API to trigger a specific workflow with minimal inputs:

```json
{
  "ref": "main",
  "inputs": {
    "buildJobId": "BJ-456",
    "configKey": "build-configs/orders/ORD-123/build-job-BJ-456.json"
  }
}
```

Do not pass full customer configuration as workflow inputs.
Pass only identifiers and storage keys.

### Why not expose GitHub to customers?

Customers should never interact with GitHub directly.

Correct flow:

```text
Customer
  -> Spiceroad Platform frontend
  -> Spiceroad Platform API
  -> GitHub App / GitHub Actions
```

The backend owns validation, authorization, order state, payment state, and delivery.
GitHub only builds.

---

## Build Configuration Files

Customer configuration should be stored as JSON in object storage.

Example:

```json
{
  "orderId": "ORD-123",
  "buildJobId": "BJ-456",
  "product": "launcher",
  "server": {
    "name": "Example Silkroad",
    "host": "login.example.com",
    "website": "https://example.com",
    "discord": "https://discord.gg/example"
  },
  "branding": {
    "logoKey": "uploads/users/U1/orders/ORD-123/logo.png",
    "backgroundKey": "uploads/users/U1/orders/ORD-123/background.png",
    "theme": "dark-gold"
  },
  "output": {
    "artifactKey": "deliverables/users/U1/orders/ORD-123/launcher.zip"
  }
}
```

GitHub Actions should fetch this configuration during the build.

---

## GitHub Actions Build Flow

Each source-backed product repository should contain a workflow such as:

```text
.github/workflows/build-customer-launcher.yml
.github/workflows/build-customer-installer.yml
```

Typical workflow steps:

1. Checkout source repository.
2. Download build configuration.
3. Download customer assets from object storage.
4. Validate required inputs.
5. Generate product-specific configuration/source files.
6. Build the launcher/installer/package.
7. Package the output.
8. Upload the output to object storage.
9. Call the backend build callback endpoint.

---

## Build Callback

At the end of a GitHub Actions run, call the backend:

```text
POST https://api.spiceroad.online/builds/{buildJobId}/callback
```

Example payload:

```json
{
  "status": "succeeded",
  "githubRunId": "123456789",
  "artifactKey": "deliverables/users/U1/orders/ORD-123/launcher.zip",
  "fileName": "launcher.zip",
  "sha256": "...",
  "logsUrl": "https://github.com/Spiceroad-Online/launcher-product/actions/runs/123456789"
}
```

Authenticate callbacks using one of:

- a build callback secret stored in GitHub Actions secrets
- short-lived signed callback tokens
- GitHub OIDC later, if needed

For v1, a callback secret is acceptable.

---

## Object Storage Strategy

Use S3-compatible object storage for all large files.

Do not store large files in SQL Server.

### Storage Use Cases

- customer uploaded assets
- uploaded `client.zip` files
- build configuration JSON files
- generated launchers/installers
- private product downloads
- free gated resources
- admin-provided deliverables

### Suggested Key Layout

```text
uploads/
  users/{userId}/orders/{orderId}/logo.png
  users/{userId}/orders/{orderId}/client.zip

build-configs/
  orders/{orderId}/build-job-{buildJobId}.json

deliverables/
  users/{userId}/orders/{orderId}/launcher.zip
  users/{userId}/orders/{orderId}/installer.exe

product-assets/
  public/free-tools/...
  private/templates/...
```

### Upload Flow

```text
Frontend requests upload URL
API validates order/user/product state
API creates upload record
API returns short-lived pre-signed upload URL
Browser uploads directly to object storage
Frontend notifies API upload completed
API validates metadata and marks upload complete
```

### Download Flow

```text
Frontend requests download
API checks user entitlement
API creates short-lived pre-signed download URL
Browser downloads from object storage
```

---

## Payment Architecture

Payments must be provider-agnostic.

Do not bake crypto-specific logic directly into the core order model.

### Recommended Abstraction

```text
IPaymentProvider
  CreatePaymentSessionAsync
  GetPaymentStatusAsync
  VerifyWebhookAsync
  ParseWebhookAsync
```

Possible providers:

- crypto provider
- BTCPay Server
- Coinbase Commerce
- NOWPayments
- Stripe later
- manual/admin-approved payment

### Payment Flow

```text
User creates order
API creates payment session
User pays through provider
Provider sends webhook
API verifies webhook signature
API marks payment confirmed
API creates/activates entitlement
API starts build job if product requires a generated build
```

### Important Rule

Webhooks are the source of truth.

Do not unlock products based only on frontend redirect success pages.

---

## Subscription Architecture

Subscriptions should also feed into entitlements.

```text
Active subscription
  -> active entitlement

Expired/canceled subscription
  -> entitlement expires or is revoked
```

Subscription examples:

- launcher subscription
- installer subscription
- monthly asset reupload allowance
- recurring updates/fixes
- access to private product updates

Some crypto providers may not support subscriptions cleanly.
If needed, model recurring access internally and rely on renewal orders/payments.

---

## SQL Server Data Model

Recommended initial entities:

```text
Users
PartnerProfiles
Products
ProductPlans
Orders
OrderItems
Payments
Subscriptions
Entitlements
Uploads
CustomerAssets
ProductBuildTemplates
BuildJobs
BuildJobEvents
Deliverables
DownloadAssets
DownloadGrants
WebhookEvents
AdminNotes
AuditLogs
```

### Product

```text
Id
Slug
Name
Description
ProductType
DeliveryType
IsFree
RequiresUpload
IsActive
CreatedAt
UpdatedAt
```

### ProductPlan

```text
Id
ProductId
Name
Amount
Currency
BillingPeriod
IsSubscription
IsActive
```

### Order

```text
Id
UserId
Status
TotalAmount
Currency
CreatedAt
UpdatedAt
```

### Payment

```text
Id
OrderId
Provider
ProviderPaymentId
Status
Amount
Currency
CreatedAt
ConfirmedAt
RawProviderPayloadJson
```

### Subscription

```text
Id
UserId
ProductId
ProductPlanId
Status
CurrentPeriodStartsAt
CurrentPeriodEndsAt
CanceledAt
```

### Entitlement

```text
Id
UserId
ProductId
SourceType
SourceId
Status
StartsAt
ExpiresAt
CreatedAt
```

### Upload / CustomerAsset

```text
Id
UserId
OrderId
Type
OriginalFileName
StorageKey
ContentType
SizeBytes
Sha256
Status
CreatedAt
```

### ProductBuildTemplate

```text
Id
ProductId
GitHubOwner
GitHubRepo
WorkflowFile
DefaultRef
BuildType
IsActive
```

### BuildJob

```text
Id
OrderId
ProductId
UserId
Status
ConfigStorageKey
OutputStorageKey
GitHubOwner
GitHubRepo
GitHubWorkflow
GitHubRef
GitHubRunId
StartedAt
CompletedAt
FailedAt
ErrorMessage
```

### Deliverable

```text
Id
BuildJobId
OrderId
UserId
ProductId
StorageKey
FileName
Version
Status
CreatedAt
```

---

## Build Job Statuses

Recommended statuses:

```text
Draft
WaitingForPayment
WaitingForAssets
WaitingForAdminReview
ReadyToBuild
Queued
Building
BuildFailed
ReadyForReview
ReadyForDelivery
Delivered
Canceled
```

For risky or expensive generated products, prefer manual review before final delivery:

```text
Building
  -> ReadyForReview
  -> ReadyForDelivery
  -> Delivered
```

---

## Backend Modules

Recommended modular monolith modules:

```text
Identity
Catalog
Orders
Payments
Subscriptions
Entitlements
Uploads
Builds
Storage
GitHubIntegration
Downloads
Admin
Notifications
Audit
```

Start as one ASP.NET Core application.
Do not start with microservices.

Use module boundaries in code, not separate deployables.

---

## API Surface MVP

Initial endpoints:

```text
GET    /health

POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me

GET    /products
GET    /products/{slug}

POST   /orders
GET    /orders
GET    /orders/{id}

POST   /payments/session
POST   /webhooks/{provider}

GET    /entitlements

POST   /uploads/init
POST   /uploads/{uploadId}/complete
GET    /uploads

POST   /builds/{buildJobId}/callback
POST   /builds/{buildJobId}/retry

GET    /downloads
POST   /downloads/{assetId}/grant-url

GET    /admin/orders
GET    /admin/orders/{id}
POST   /admin/orders/{id}/approve
POST   /admin/orders/{id}/reject
POST   /admin/orders/{id}/trigger-build
POST   /admin/assets
POST   /admin/entitlements/grant
POST   /admin/entitlements/revoke
```

---

## Admin Workflow

An admin dashboard will be needed early.

Minimum admin capabilities:

- list orders
- inspect customer intake details
- inspect uploaded assets
- approve/reject uploads
- trigger or retry builds
- view GitHub Actions run IDs/log links
- mark custom services as quoted
- attach manual deliverables
- grant/revoke entitlements
- view payment status
- view webhook events
- view audit trail

Do not make every product fully automatic from the beginning.
Manual review is useful for customer-specific builds.

---

## Security Rules

### Customers can:

- view their own orders
- upload only to their own active orders
- download only assets they are entitled to
- claim free gated resources only while authenticated

### Customers cannot:

- see GitHub repository URLs or secrets
- access permanent object-storage URLs
- trigger builds directly
- download artifacts without entitlement checks
- access other customers' uploads or deliverables

### Backend can:

- issue pre-signed upload URLs
- issue pre-signed download URLs
- trigger GitHub Actions workflows
- verify payment webhooks
- verify build callbacks
- create entitlements

### GitHub Actions can:

- read build config for a specific build
- download required customer assets
- upload one or more generated outputs
- call the backend callback endpoint

---

## GitHub Releases vs Private Deliverables

Use GitHub Releases only for generic products that are not customer-specific, such as:

- generic utilities
- public/free tooling
- source packages
- SDK-style packages

Do not use GitHub Releases for customer-specific launcher/installer outputs.

Customer-specific deliverables should go to private object storage only.

```text
Generic product release
  -> GitHub Releases or object storage

Customer-specific build output
  -> private object storage only
```

---

## Recommended MVP Scope

### Customer-facing MVP

- register/login
- product catalog
- product detail pages
- create order
- upload assets/details for order
- show order status
- download ready deliverable

### Admin MVP

- view orders
- inspect uploads
- approve intake
- manually trigger build
- retry failed build
- attach deliverable if needed
- grant/revoke entitlement

### Backend MVP

- ASP.NET Core API
- SQL Server persistence
- object storage integration
- GitHub workflow dispatch
- GitHub build callback
- entitlement checks
- signed upload/download URLs

### Payment MVP

Start with one of:

- manual payment/admin approval
- one crypto provider

Do not let payment integration block the build-order pipeline.
The build-order pipeline is the core product.

---

## Future Backend Hosting Options

The backend can be hosted independently from GitHub Pages.

Good options:

- Azure App Service + Azure SQL
- Dockerized ASP.NET Core API on VPS
- Render/Railway/Fly.io with SQL Server hosted separately
- Azure Container Apps

Since the frontend is static, the backend only needs to expose HTTPS APIs and allow CORS for:

```text
https://platform.spiceroad.online
https://spiceroad.online
```

Do not use wildcard CORS in production.

---

## Environment and Configuration

Recommended configuration values:

```text
ConnectionStrings__PlatformDb
Storage__Provider
Storage__Bucket
Storage__Endpoint
Storage__AccessKey
Storage__SecretKey
GitHub__AppId
GitHub__InstallationId
GitHub__PrivateKey
Payments__Provider
Payments__WebhookSecret
Builds__CallbackSecret
Frontend__PlatformOrigin
Frontend__MainOrigin
```

Secrets must never be committed to the frontend or repository.

---

## First Implementation Sprint

### Goal
Create the first backend foundation without overbuilding.

### Tasks

1. Create ASP.NET Core Web API project.
2. Add SQL Server connection and EF Core.
3. Create initial domain entities:
   - Product
   - Order
   - OrderItem
   - Upload
   - BuildJob
   - Deliverable
   - Entitlement
4. Add migrations.
5. Add product catalog endpoints.
6. Add order creation endpoint.
7. Add upload-init endpoint with placeholder storage provider.
8. Add build-job model and admin-trigger endpoint.
9. Add GitHub workflow dispatch service interface.
10. Add download-grant endpoint that checks entitlement.

### Deliverable
A working backend skeleton that can represent the complete customer-specific product flow, even before payments and full storage integration are finalized.

---

## Final Architecture Summary

```text
Astro Platform Frontend
  static product pages
  dashboard UI
  upload forms
  calls API

ASP.NET Core Backend
  auth
  catalog
  orders
  uploads
  payments
  subscriptions
  entitlements
  builds
  downloads
  admin

SQL Server
  platform business data

S3-compatible Storage
  customer uploads
  build configs
  generated deliverables
  private downloads

GitHub App
  secure access to product source repositories

GitHub Actions
  builds customer-specific launchers/installers/packages

Payment Provider Abstraction
  crypto/manual/cards later

Entitlements
  single source of truth for access
```

This architecture keeps the platform simple enough to build as a modular monolith, but powerful enough to support real customer-specific product delivery.
