name: SNS Matome Auto Crawler

on:
  schedule:
    # Run every 15 minutes
    - cron: '*/15 * * * *'
  # Allows manually triggering the workflow from the Actions tab on GitHub
  workflow_dispatch:

permissions:
  contents: write

jobs:
  crawl-and-update:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci || npm install

      - name: Install Playwright Browsers
        run: npx playwright install chromium --with-deps

      - name: Run SNS Crawler Script
        run: npm run crawl
        env:
          # If any sensitive tokens or cookies are needed for X, they can be configured in GitHub Secrets:
          # X_COOKIE: ${{ secrets.X_COOKIE }}
          NODE_ENV: production

      - name: Commit and Push Updated Posts JSON Data
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          
          # Stage posts file
          git add public/data/posts.json
          
          # Check if there are changes to commit
          if git diff-index --quiet HEAD; then
            echo "No viral posts data changes detected. Skipping release commit."
          else
            git commit -m "chore: auto-update SNS hot trends posts.json [skip ci]"
            
            # Use pull --rebase and a retry loop to confidently handle race conditions
            success=false
            for i in {1..3}; do
              echo "Attempt $i: Pulling, rebasing, and pushing to branch..."
              if git pull --rebase origin HEAD && git push origin HEAD:${{ github.ref }}; then
                echo "Successfully committed and pushed updated posts.json to branch."
                success=true
                break
              fi
              echo "Push failed. Waiting 5 seconds before retrying..."
              sleep 5
            done
            
            if [ "$success" = false ]; then
              echo "Error: Failed to push posts.json updates after 3 attempts."
              exit 1
            fi
          fi
