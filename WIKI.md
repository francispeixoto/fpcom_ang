# fpcom_ang Wiki - Custom DNS Configuration

**This file contains wiki content that can be copied to the GitHub repository wiki.**

---

## Wiki Page: Custom DNS Configuration

### Setting Up a Custom Domain for GitHub Pages

This page explains how to configure a custom domain (like `www.yourname.com` or `yourname.com`) for your GitHub Pages site.

#### Prerequisites
- Your site is deployed to GitHub Pages
- You own a domain name
- You have access to your domain's DNS management panel

---

### Step 1: Configure DNS at Your Provider

You need to add DNS records at your domain registrar or DNS hosting service (GoDaddy, Namecheap, Cloudflare, etc.).

#### Option A: Using a Subdomain (www.yourname.com) ✅ RECOMMENDED

This is the easier and more reliable option.

**Add a CNAME record:**

| Field | Value |
|-------|-------|
| Type | CNAME |
| Name/Host | www |
| Target/Value | your-github-username.github.io. |
| TTL | 3600 (or default) |

**Example:**
- If your GitHub username is `francispeixoto`
- Target should be: `francispeixoto.github.io.`
- Note: The trailing dot (`.`) is important!

#### Option B: Using an Apex Domain (yourname.com)

This requires multiple A records.

**Add 4 A records:**

| Type | Name/Host | Value/IP |
|------|-----------|----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Optional - IPv6 Support (4 AAAA records):**

| Type | Name/Host | Value/IPv6 |
|------|-----------|------------|
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

---

### Step 2: Add Custom Domain in GitHub

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Custom domain", enter your domain:
   - For subdomain: `www.yourname.com`
   - For apex: `yourname.com`
5. Click **Save**
6. Wait for the DNS check to complete (green checkmark)
7. Once verified, enable **Enforce HTTPS**

---

### Step 3: Wait for Propagation

- **DNS propagation time:** 5 minutes to 48 hours
  - Usually 1-2 hours for CNAME records
  - Usually 12-24 hours for A records
- **GitHub DNS check:** A few minutes to several hours
- **HTTPS certificate:** Up to 24 hours after DNS verification

---

### Verification

#### Check DNS Propagation

Visit these websites to check if DNS has propagated globally:
- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://www.whatsmydns.net)

#### Command Line Check

**macOS/Linux:**
```bash
# For subdomain (CNAME)
dig www.yourname.com CNAME

# For apex domain (A records)
dig yourname.com A
```

**Windows:**
```cmd
nslookup www.yourname.com
nslookup yourname.com
```

---

### Provider-Specific Guides

#### Cloudflare
1. Go to the **DNS** tab
2. Add the CNAME or A records
3. **IMPORTANT:** Click the orange cloud to turn it **gray** (DNS only mode)
4. GitHub Pages doesn't work well with Cloudflare proxy enabled
5. Save the record

#### GoDaddy
1. Sign in to GoDaddy Domain Manager
2. Select your domain
3. Click **DNS** or **Manage DNS**
4. Click **Add** under Records
5. Select record type (CNAME or A)
6. Fill in the fields and save

#### Namecheap
1. Sign in and go to Domain List
2. Click **Manage** next to your domain
3. Go to **Advanced DNS** tab
4. Click **Add New Record**
5. Select type, enter host and value
6. Click the checkmark to save

#### Google Domains
1. Go to **DNS** section
2. Scroll to **Custom resource records**
3. Add your CNAME or A records
4. Click **Add**

#### AWS Route 53
1. Open your hosted zone
2. Click **Create record**
3. Enter the record details
4. Click **Create records**

---

### Troubleshooting

#### Problem: "DNS check failed" in GitHub

**Solutions:**
- Wait 24-48 hours for DNS to propagate fully
- Double-check your DNS records for typos
- Verify you're using the correct format (e.g., trailing dot in CNAME)
- Check that there are no conflicting DNS records

#### Problem: Site shows 404 error

**Solutions:**
- Verify the custom domain is saved in GitHub Settings → Pages
- Check that DNS has propagated using online tools
- Clear your browser cache (Ctrl+Shift+Delete)
- Wait a few more hours for full propagation

#### Problem: "HTTPS not available"

**Solutions:**
- Wait up to 24 hours after DNS verification
- Ensure DNS records are correct and propagated
- Try removing and re-adding the custom domain in GitHub
- Check [GitHub Status](https://www.githubstatus.com/) for any issues

#### Problem: Cloudflare issues

**Solutions:**
- Disable the proxy (orange cloud → gray cloud)
- Use "DNS only" mode, not "Proxied"
- Check SSL/TLS settings (should be "Flexible" or "Full")

---

### Best Practices

✅ **Use a subdomain** (`www.yourname.com`) - easier to configure
✅ **Enable HTTPS** - protects your visitors
✅ **Use DNS only mode** on Cloudflare (gray cloud)
✅ **Document your DNS settings** for future reference
✅ **Test from multiple locations** after configuration

---

### Quick Reference

**For subdomain (RECOMMENDED):**
```
DNS: CNAME www → username.github.io.
GitHub: Enter www.yourname.com
Wait: 1-2 hours
Enable: HTTPS
```

**For apex domain:**
```
DNS: 4 A records → GitHub IPs
GitHub: Enter yourname.com
Wait: 24-48 hours
Enable: HTTPS
```

---

### Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)
- [DNS Checker Tool](https://dnschecker.org)

---

## Instructions for Adding to GitHub Wiki

To add this content to your GitHub repository wiki:

1. Go to your repository on GitHub
2. Click the **Wiki** tab (if not visible, enable it in Settings)
3. Click **Create the first page** or **New Page**
4. Enter page title: "Custom DNS Configuration"
5. Copy the content from "### Setting Up a Custom Domain for GitHub Pages" onwards
6. Paste into the wiki editor
7. Click **Save Page**

Alternatively, you can link to the [docs/CUSTOM-DNS-SETUP.md](docs/CUSTOM-DNS-SETUP.md) file from your wiki home page.
