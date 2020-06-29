FROM python:3.8

RUN apt update -y && \
    apt install python-future -y && \
    apt install python3-future -y && \
    apt install libtool -y && \
    apt install autoconf -y

# Set the working directory, this is the image file system
WORKDIR /usr/src/mavrouter

RUN git clone https://github.com/intel/mavlink-router.git && \
    cd mavlink-router && \
    git submodule update --init --recursive && \
    ./autogen.sh && \
    pip install future && \
    ./configure CFLAGS='-g -O2' --sysconfdir=/etc --localstatedir=/var --libdir=/usr/lib64 --prefix=/usr --disable-systemd && \
    make && \
    make install

EXPOSE 14550-14560/udp

# build the image using: docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavlink-router:<tag> .

################### TESTING #######################
# run the image using: docker run --rm -it -d --device=/dev/serial0:/dev/serial0 -p "14550-14649:14550-14649" --name=MAVLink-Router gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavlink-router:<tag>
# and: docker exec --detach MAVLink-Router sh -c "mavlink-routerd -e 127.0.0.1:14550 -e 127.0.0.1:14551 -e 192.168.1.20:14550 -e 172.17.0.1:14550 -e 10.2.0.212:14550 /dev/serial0:921600"

# To test the docker container, you can copy the telemetry.py file into a running container.

################## TESTING METHOD 2 ###############
# Uncomment the following lines to define routings for the MAVLink-Router using the docker-entrypoint.sh file
# Do not uncomment line when building the image, that will be used by the Ug-One_API
# Ug-One_API creates a custom startup command based on user configuration instead.

# COPY docker-entrypoint.sh /usr/src/mavrouter
# CMD [ "/bin/sh", "/usr/src/mavrouter/docker-entrypoint.sh"] 