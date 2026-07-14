# The Alpine Office

The source code for The Alpine Office website.

## Repository structure

```text
index.html
assets/
  css/styles.css
  js/site.js
  images/
```

The site uses plain HTML, CSS and JavaScript. It has no framework, package manager or build step.

## Preview locally

Open `index.html` directly in a browser, or run a local static server from the repository folder.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Upload these files to the root of a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.

GitHub will provide the published address after the first deployment completes.

## Publish with Cloudflare Pages

Connect the repository to Cloudflare Pages and use these settings:

```text
Framework preset: None
Build command: Leave blank
Build output directory: /
```

## Custom domain

Add your domain in GitHub Pages or Cloudflare Pages, then follow the DNS records shown by that provider.

## Membership form

The membership form is currently a visual preview. It does not transmit applications. Connect it to Salesforce Web-to-Lead or another secure form endpoint before public launch.

