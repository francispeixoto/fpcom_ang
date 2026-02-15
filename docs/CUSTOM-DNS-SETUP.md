# Custom DNS Configuration for GitHub Pages

This guide explains how to configure a custom domain for the fpcom_ang GitHub Pages site.

## Prerequisites

- GitHub Pages is enabled for your repository
- You own a domain name (e.g., example.com)
- You have access to your domain's DNS settings

## Overview

To use a custom domain with GitHub Pages, you need to:
1. Configure DNS records at your DNS provider
2. Add the custom domain in GitHub repository settings
3. Enable HTTPS

## GitHub Configuration

### Add Custom Domain

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Custom domain", enter your domain:
   - For subdomain: `www.example.com`
   - For apex domain: `example.com`
4. Click **Save**
5. Wait for DNS verification (may take several minutes to hours)
6. Once verified, check **Enforce HTTPS**

## DNS Provider Configuration

### Option 1: Subdomain (www.example.com) - RECOMMENDED

**Easier to configure and more reliable**

Create a CNAME record:

| Type  | Name/Host | Value/Target              | TTL  |
|-------|-----------|---------------------------|------|
| CNAME | www       | <username>.github.io.     | 3600 |

**Example for user `francispeixoto`:**
```
Type: CNAME
Name: www
Target: francispeixoto.github.io.
```

**Note:** The trailing dot (.) in `francispeixoto.github.io.` is important!

### Option 2: Apex Domain (example.com)

**More complex - requires multiple A records**

Create 4 A records pointing to GitHub's servers:

| Type | Name/Host | Value/IP Address   | TTL  |
|------|-----------|-------------------|------|
| A    | @         | 185.199.108.153   | 3600 |
| A    | @         | 185.199.109.153   | 3600 |
| A    | @         | 185.199.110.153   | 3600 |
| A    | @         | 185.199.111.153   | 3600 |

**Optional IPv6 support (AAAA records):**

| Type | Name/Host | Value/IPv6 Address    | TTL  |
|------|-----------|----------------------|------|
| AAAA | @         | 2606:50c0:8000::153  | 3600 |
| AAAA | @         | 2606:50c0:8001::153  | 3600 |
| AAAA | @         | 2606:50c0:8002::153  | 3600 |
| AAAA | @         | 2606:50c0:8003::153  | 3600 |

**Optional: Redirect www to apex**
```
Type: CNAME
Name: www
Target: <username>.github.io.
```

## DNS Provider-Specific Instructions

### Cloudflare
1. Go to **DNS** section
2. Add the records as shown above
3. **IMPORTANT:** Set the cloud icon to **gray** (DNS only), NOT orange (Proxied)
4. Save changes

### GoDaddy
1. Go to **My Products** → **DNS**
2. Click **Add** to create records
3. Select record type (CNAME or A)
4. Fill in the details
5. Save

### Namecheap
1. Go to **Advanced DNS** tab
2. Click **Add New Record**
3. Choose record type
4. Fill in host, value, and TTL
5. Click the green checkmark to save

### Google Domains / Google Cloud DNS
1. Go to **DNS** settings
2. Click **Manage custom records**
3. Add records
4. Save

### AWS Route 53
1. Open your hosted zone
2. Click **Create record**
3. Add A or CNAME records as specified
4. Save

## Verification

### Check DNS Propagation

Use online tools:
- [DNS Checker](https://dnschecker.org) - Check global propagation
- [What's My DNS](https://www.whatsmydns.net) - View DNS from different locations

### Command Line Verification

**Mac/Linux:**
```bash
# Check CNAME record
dig www.example.com CNAME

# Check A records
dig example.com A

# Check AAAA records (IPv6)
dig example.com AAAA
```

**Windows:**
```cmd
nslookup www.example.com
nslookup example.com
```

### Expected Results

**For CNAME (subdomain):**
```
www.example.com.  3600  IN  CNAME  francispeixoto.github.io.
```

**For A records (apex domain):**
```
example.com.  3600  IN  A  185.199.108.153
example.com.  3600  IN  A  185.199.109.153
example.com.  3600  IN  A  185.199.110.153
example.com.  3600  IN  A  185.199.111.153
```

## Timeline

- **DNS propagation:** 5 minutes to 48 hours (typically 1-2 hours)
- **GitHub DNS verification:** Few minutes to several hours
- **HTTPS certificate:** Up to 24 hours after DNS verification

## Troubleshooting

### DNS Check Failed
- Wait 24-48 hours for full DNS propagation
- Verify records are entered correctly
- Check for typos in the target/value field
- Ensure there are no conflicting DNS records

### 404 Error
- Verify custom domain is saved in GitHub Settings → Pages
- Check that DNS has propagated globally
- Clear browser cache and try again
- Verify the CNAME file exists in your deployed site

### HTTPS Not Available
- Wait up to 24 hours after DNS verification
- Ensure DNS records are correct
- Try removing and re-adding the custom domain
- Check GitHub Status page for any issues

### Cloudflare-Specific Issues
- Ensure proxy (orange cloud) is **disabled**
- Use "DNS only" mode (gray cloud)
- Temporarily disable Cloudflare features that might interfere

## Best Practices

1. **Use HTTPS:** Always enable "Enforce HTTPS" in GitHub settings
2. **Use subdomain:** `www.example.com` is easier than apex domain
3. **Monitor DNS:** Use monitoring tools to detect DNS issues
4. **Document changes:** Keep a record of DNS settings
5. **Test thoroughly:** Test from multiple devices/locations after changes

## Additional Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## Quick Reference Card

### Subdomain Setup (Recommended)
```
GitHub: www.example.com
DNS: CNAME www → <username>.github.io.
Wait: 1-2 hours
Enable: HTTPS
```

### Apex Domain Setup
```
GitHub: example.com
DNS: 4 A records → GitHub IPs (185.199.108-111.153)
Wait: 24-48 hours
Enable: HTTPS
```

## Support

If you continue to have issues:
1. Check [GitHub Status](https://www.githubstatus.com/)
2. Review [GitHub Pages Documentation](https://docs.github.com/en/pages)
3. Contact your DNS provider support
4. Open an issue in this repository
