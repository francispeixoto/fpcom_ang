# GitHub Pages Deployment Guide

This document provides comprehensive instructions for deploying the fpcom_ang Angular application to GitHub Pages with custom DNS configuration.

## Table of Contents
- [Automatic Deployment](#automatic-deployment)
- [GitHub Pages Configuration](#github-pages-configuration)
- [Custom DNS Configuration](#custom-dns-configuration)
  - [GitHub Side Configuration](#github-side-configuration)
  - [DNS Provider Side Configuration](#dns-provider-side-configuration)
- [Troubleshooting](#troubleshooting)

## Automatic Deployment

The project uses GitHub Actions to automatically build and deploy to GitHub Pages whenever changes are pushed to the `main` branch.

### Workflow Overview

The deployment workflow (`.github/workflows/deploy-github-pages.yml`) performs the following steps:

1. **Build Job**:
   - Checks out the repository code
   - Sets up Node.js 22 with npm caching
   - Installs dependencies with `npm ci`
   - Builds the Angular production application
   - Adds `.nojekyll` file to prevent Jekyll processing
   - Uploads the build artifacts to GitHub Pages

2. **Deploy Job**:
   - Deploys the uploaded artifacts to GitHub Pages
   - Provides the deployment URL

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the repository on GitHub
2. Click on the "Actions" tab
3. Select "Deploy to GitHub Pages" workflow
4. Click "Run workflow" button
5. Select the `main` branch and click "Run workflow"

## GitHub Pages Configuration

### Initial Setup

Before the automatic deployment can work, you need to enable GitHub Pages for your repository:

1. **Navigate to Repository Settings**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" in the left sidebar

2. **Configure Source**:
   - Under "Build and deployment"
   - **Source**: Select "GitHub Actions" (not "Deploy from a branch")
   - This allows the workflow to handle the deployment

3. **Save Configuration**:
   - The settings will be saved automatically
   - GitHub Pages will be enabled

### Verify Deployment

After the first successful workflow run:
1. Go to repository Settings → Pages
2. You should see a message: "Your site is live at `https://<username>.github.io/<repository>/`"
3. Click the link to verify your site is working

## Custom DNS Configuration

To use a custom domain (e.g., `www.example.com` or `example.com`) with your GitHub Pages site, you need to configure both GitHub and your DNS provider.

### GitHub Side Configuration

#### Step 1: Add Custom Domain

1. **Navigate to GitHub Pages Settings**:
   - Repository → Settings → Pages

2. **Add Custom Domain**:
   - In the "Custom domain" section
   - Enter your custom domain (e.g., `www.example.com` or `example.com`)
   - Click "Save"

3. **Wait for DNS Check**:
   - GitHub will verify your DNS configuration
   - This may take a few minutes to several hours
   - You'll see a checkmark when verification is successful

#### Step 2: Enforce HTTPS

1. **Enable HTTPS** (recommended):
   - After DNS verification completes
   - Check the box "Enforce HTTPS"
   - GitHub will automatically provision a free SSL certificate via Let's Encrypt
   - This may take up to 24 hours for the certificate to be issued

#### Important Notes:
- GitHub will create a `CNAME` file in your repository's root during deployment
- The automated workflow will preserve this file across deployments
- If you're using an apex domain (e.g., `example.com`), you may also want to set up a redirect from `www.example.com`

### DNS Provider Side Configuration

You need to configure DNS records at your domain registrar or DNS hosting provider. The configuration differs based on whether you're using a subdomain or apex domain.

#### Option 1: Using a Subdomain (e.g., www.example.com)

**Recommended approach** - easier to set up and more reliable.

1. **Log into your DNS provider** (e.g., GoDaddy, Namecheap, Cloudflare, Route53, etc.)

2. **Create a CNAME record**:
   - **Type**: CNAME
   - **Name/Host**: `www` (or your desired subdomain)
   - **Value/Points to**: `<username>.github.io.` (replace `<username>` with your GitHub username)
   - **TTL**: 3600 (or leave as default)

   Example for user `francispeixoto`:
   ```
   Type: CNAME
   Name: www
   Value: francispeixoto.github.io.
   TTL: 3600
   ```

3. **Save the record**
   - Changes may take 5 minutes to 48 hours to propagate
   - Typically propagates within 1-2 hours

#### Option 2: Using an Apex Domain (e.g., example.com)

**More complex** - requires A records pointing to GitHub's IP addresses.

1. **Log into your DNS provider**

2. **Create A records** (you need to create 4 separate A records):
   - **Type**: A
   - **Name/Host**: `@` (represents your apex domain)
   - **Value/Points to**: Each of these GitHub Pages IP addresses:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **TTL**: 3600 (or leave as default)

   Example configuration:
   ```
   Type: A, Name: @, Value: 185.199.108.153, TTL: 3600
   Type: A, Name: @, Value: 185.199.109.153, TTL: 3600
   Type: A, Name: @, Value: 185.199.110.153, TTL: 3600
   Type: A, Name: @, Value: 185.199.111.153, TTL: 3600
   ```

3. **Optional: Create AAAA records for IPv6** (recommended):
   - **Type**: AAAA
   - **Name/Host**: `@`
   - **Value/Points to**: Each of these GitHub Pages IPv6 addresses:
     - `2606:50c0:8000::153`
     - `2606:50c0:8001::153`
     - `2606:50c0:8002::153`
     - `2606:50c0:8003::153`

4. **Optional: Redirect www to apex**:
   - If you want `www.example.com` to redirect to `example.com`
   - Create a CNAME record:
     - **Type**: CNAME
     - **Name**: `www`
     - **Value**: `<username>.github.io.`

5. **Save all records**
   - DNS propagation may take 24-48 hours
   - Apex domains typically take longer than subdomains

#### Verification

To verify your DNS configuration is correct:

1. **Check DNS propagation**:
   - Use online tools like:
     - https://dnschecker.org
     - https://www.whatsmydns.net
   - Enter your domain name
   - Check that DNS records are resolving correctly globally

2. **Using command line** (on Mac/Linux):
   ```bash
   # For CNAME (subdomain)
   dig www.example.com CNAME

   # For A records (apex domain)
   dig example.com A

   # For AAAA records (IPv6)
   dig example.com AAAA
   ```

3. **Using command line** (on Windows):
   ```cmd
   nslookup www.example.com
   nslookup example.com
   ```

### DNS Provider-Specific Guides

#### Cloudflare
- Go to DNS management
- Ensure "Proxied" is turned OFF (gray cloud) for GitHub Pages records
- Use "DNS only" mode (gray cloud icon)

#### GoDaddy
- Go to DNS Management
- Add records as described above
- Wait for propagation (usually 1 hour)

#### Namecheap
- Go to Advanced DNS
- Add records as described above
- Namecheap may show "Automatic" TTL - this is fine

#### AWS Route 53
- Create a hosted zone for your domain
- Add A or CNAME records as described
- Update nameservers at your registrar if needed

#### Google Domains
- Go to DNS settings
- Click "Manage custom records"
- Add the appropriate records

## Troubleshooting

### Common Issues

#### 1. "DNS check failed" on GitHub
**Cause**: DNS records not properly configured or not yet propagated

**Solutions**:
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct using `dig` or online tools
- Ensure CNAME points to `<username>.github.io.` (note the trailing dot)
- For apex domains, verify all 4 A records are present

#### 2. 404 Error when visiting custom domain
**Cause**: GitHub hasn't associated the custom domain with your repository

**Solutions**:
- Verify custom domain is saved in Settings → Pages
- Check that CNAME file exists in the deployed site
- Verify DNS has fully propagated
- Try re-saving the custom domain in GitHub settings

#### 3. "HTTPS not available" or certificate errors
**Cause**: SSL certificate not yet provisioned

**Solutions**:
- Wait up to 24 hours after DNS verification
- Ensure "Enforce HTTPS" is enabled
- Verify DNS records are correct
- Try removing and re-adding the custom domain

#### 4. Old version of site showing
**Cause**: Browser or DNS caching

**Solutions**:
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Wait for DNS TTL to expire
- Check the deployment was successful in Actions tab

#### 5. Deployment workflow fails
**Cause**: Various build or permission issues

**Solutions**:
- Check the Actions tab for error details
- Verify Node.js version compatibility
- Ensure dependencies install correctly
- Check that GitHub Pages permissions are set correctly

#### 6. Assets (images, fonts) not loading
**Cause**: Incorrect base href or routing issues

**Solutions**:
- Verify `angular.json` has correct base href (`/`)
- Check browser console for 404 errors
- Ensure `.nojekyll` file is present in deployed site
- Verify assets are in the correct directory

### Getting Help

If you continue to experience issues:

1. **Check GitHub Status**: https://www.githubstatus.com/
2. **GitHub Pages Documentation**: https://docs.github.com/en/pages
3. **Repository Issues**: Open an issue in this repository
4. **GitHub Support**: Contact GitHub support for Pages-specific issues

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [DNS Propagation Checker](https://dnschecker.org)

## Security Considerations

1. **HTTPS**: Always enforce HTTPS for production sites
2. **CNAME Security**: Keep the CNAME file in your repository to prevent domain takeover
3. **DNS Security**: Use DNSSEC if your DNS provider supports it
4. **Content Security**: Review and update security headers if needed

## Maintenance

### Updating the Site
- Push changes to the `main` branch
- GitHub Actions will automatically build and deploy
- Changes typically appear within 2-5 minutes

### Monitoring
- Check the Actions tab for deployment status
- Set up notifications for failed workflows
- Monitor site availability using external tools (e.g., UptimeRobot)

### Costs
- GitHub Pages is free for public repositories
- Custom domain DNS hosting may have costs depending on your provider
- SSL certificates are free via Let's Encrypt (automatic)
