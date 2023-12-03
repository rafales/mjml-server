# `mjml-server`

This piece of code exposes [MJML](https://mjml.io) rendering over HTTP so it can be easily used
by backend code running non-node stack.

## Publishing

We use versioning for docker images for this package. We use versions like `1.0`, `1.1` etc.

1. **Commit Your Changes**: Ensure all your changes are committed to the main branch (or your default development branch).
2. **Tag Your Release**: Create a new Git tag with your desired version number. For example, to tag a release as `v1.0`, you'd use:
   ```bash
   git tag v1.0
   ```
3. **Push the Tag**: Push the tag to GitHub:
   ```bash
   git push origin main --tags
   ```
4. **Automated Build & Push**: Once the tag is pushed to GitHub, our GitHub Actions workflow will automatically build the Docker image and push it to the GitHub Container Registry with the version tag.

### Pulling the Published Docker Image

To pull a specific version of our Docker image, use:

```bash
# specific version
docker pull ghcr.io/rafales/mjml-server:v1.0
# latest
docker pull ghcr.io/rafales/mjml-server:latest
```
