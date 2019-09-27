# Create image based on official Ruby
FROM ruby:2.5.6

# Install dependencies
RUN apt-get update && apt-get install -y \
    apt-utils \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && curl -o- -L https://yarnpkg.com/install.sh | bash

# Configure the main working directory. This is the base 
# directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
RUN mkdir -p /app 
WORKDIR /app

# Copy the Gemfile as well as the Gemfile.lock and install 
# the RubyGems. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY Gemfile Gemfile.lock ./ 
RUN gem install bundler && bundle install --jobs 20 --retry 5

# Copy the main application.
COPY . ./

# Expose port 3000 to the Docker host, so we can access it 
# from the outside.
EXPOSE 3000

# The main command to run when the container starts. Also 
# tell the Rails dev server to bind to all interfaces by 
# default.
CMD ["rails", "server", "-b", "0.0.0.0"]
