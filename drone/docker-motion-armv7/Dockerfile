FROM ubuntu:bionic
LABEL maintainer="TBD"

#Setup parameters
ARG BUILD_DATE
ARG VCS_REF
LABEL org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.docker.dockerfile="Dockerfile" \
    org.label-schema.license="GPLv3" \
    org.label-schema.name="motion" \
    org.label-schema.url="https://motion-project.github.io/" \
    org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.vcs-type="Git"

# Setup Timezone packages and avoid all interaction. This will be overwritten by the user when selecting TZ in the run command
RUN export DEBIAN_FRONTEND=noninteractive; \
    export DEBCONF_NONINTERACTIVE_SEEN=true; \
    apt-get update -qqy && apt-get install -qqy --option Dpkg::Options::="--force-confnew" --no-install-recommends \
    autoconf automake build-essential pkgconf libtool libzip-dev libjpeg-dev tzdata \
    git libavformat-dev libavcodec-dev libavutil-dev libswscale-dev libavdevice-dev \
    libwebp-dev gettext autopoint libmicrohttpd-dev ca-certificates imagemagick curl wget \
    libavformat-dev libavcodec-dev libavutil-dev libswscale-dev libavdevice-dev ffmpeg x264 && \
    apt-get --quiet autoremove --yes && \
    apt-get --quiet --yes clean && \
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/Motion-Project/motion.git  && \
    cd motion  && \
    autoreconf -fiv && \
    ./configure && \
    make clean && \
    make && \
    make install && \
    cd .. && \
    rm -fr motion

# R/W needed for motion to update configurations
VOLUME /usr/local/etc/motion
# R/W needed for motion to update Video & images
VOLUME /var/lib/motion

COPY motion.conf usr/local/etc/motion/motion.conf

# CMD test -e /usr/local/etc/motion/motion.conf || \
    # cp /usr/local/etc/motion/motion-dist.conf /usr/local/etc/motion/motion.conf

CMD [ "motion", "-m" ]

# based on https://github.com/Motion-Project/motion-docker, this Dockerfile implements an open pull request that fixes an issue were auttopoint is not installed

# build the image using: docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/docker-motion-armv7:latest .
# run the image using: docker run -p 8080:8080 -p 8081:8081 --device=/dev/video0:/dev/video0 gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/docker-motion-armv7:latest
# TODO: might need to mount the entire /dev folder, if devices is plugged in after run start, it's technically a different file so Docker won't see it.
# or add the following option to specify a different conf file at startup: -v /path/to/conffile/on/host/motion.conf:/usr/local/etc/motion/motion.conf

