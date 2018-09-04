# rucs-uoft.github.io
The RUCS website.

### Local Development
- Ensure that you have Ruby installed.
- Install Bundler: ```gem install bundler```
- Install project dependencies: ```bundle install```
- Run the server locally: ```bundle exec jekyll serve```

#### Troubleshooting
If you are on Mac OS and encounter errors during installation, try:
- updating Ruby
- ```xcode-select --install```
- ```ln -s /usr/local/opt/mpfr/lib/libmpfr.6.dylib /usr/local/opt/mpfr/lib/libmpfr.4.dylib```
- deleting `Gemfile.lock` file and `.bundle`, `_site` directories and doing `bundle install` again.
