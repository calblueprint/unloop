# Create image based on official Ruby
FROM ruby:2.5.6

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    sudo \
    libpq-dev \
    libjpeg-dev \
    libpng-dev
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y nodejs yarn \
    && apt-get clean
    # && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
    # && curl -o- -L https://yarnpkg.com/install.sh | bash -
    # && rm -rf /var/lib/apt/lists/* \

# Configure the main working directory. This is the base 
# directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app

# Copy the Gemfile as well as the Gemfile.lock and install 
# the RubyGems. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY Gemfile Gemfile.lock package.json yarn.lock ./ 
RUN gem install bundler && bundle install --jobs 20 --retry 5 && yarn install --jobs 20 --retry 5

# Copy the main application.
COPY . ./

# Expose port 3000 to the Docker host, so we can access it 
# from the outside.
EXPOSE 3000

ENTRYPOINT [ "/bin/bash" ]

# The main command to run when the container starts. Also 
# tell the Rails dev server to bind to all interfaces by 
# default.
# CMD ["rails", "server", "-b", "0.0.0.0"]
