FROM python:3.8

# Set the working directory, this is the image file system
WORKDIR /usr/src/app

RUN apt update -y && \
    apt upgrade -y && \
    apt-get update -y && \
    apt-get install cmake build-essential colordiff git doxygen -y && \ 
    rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/mavlink/MAVSDK.git
WORKDIR /usr/src/app/MAVSDK
RUN git checkout master && \
    git submodule update --init --recursive && \
    cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=ON -Bbuild/default -H. && \
    cmake --build build/default && \
    cmake --build build/default --target install && \
    ldconfig

# Building the mavsdk-server
RUN cmake -DBUILD_BACKEND=ON --symlink-install --cmake-args "-DCMAKE_SHARED_LINKER_FLAGS='-latomic'" "-DCMAKE_EXE_LINKER_FLAGS='-latomic'" -Bbuild/default -H. && \
    cmake --build build/default --target install

WORKDIR /usr/src/app/
RUN git clone https://github.com/mavlink/MAVSDK-Python --recursive
WORKDIR /usr/src/app/MAVSDK-Python/proto/pb_plugins
RUN pip3 install --no-cache-dir -r requirements.txt && \
    pip3 install --no-cache-dir -e .  
# Above needs to be the -e (editable) version or doesn't work, don't know why though


WORKDIR /usr/src/app/MAVSDK-Python
RUN pip3 install --no-cache-dir -r requirements.txt -r requirements-dev.txt && \
    ./other/tools/run_protoc.sh && \
    pip3 install --no-cache-dir -e . && \
    mv /usr/src/app/MAVSDK/build/default/src/backend/src/mavsdk_server /usr/src/app/MAVSDK-Python/mavsdk/bin/ && \
    pip3 uninstall -r requirements-dev.txt -y && \ 
    apt autoremove -y

# Removing some thinks to reduce image size when using the --squash option
RUN apt-get --purge remove cmake build-essential colordiff git doxygen -y
RUN apt-get autoremove -y
# removing some files from MAVSDK to save some storage space.

WORKDIR /usr/src/app/
RUN rm -r MAVSDK

# build the image using: docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavsdk-python-armv7:latest .
# This image has a long build time, it is recommended to build it without the --squash option first to prevent preserve progress upon failure.
# on the second build, use the --squash option, docker will use the cached layers and only needs to squash them.

##################### TESTING ########################
# test run the image using: docker run --rm -it -p 127.0.0.1:14550:14550/udp gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavsdk-python-armv8 sh
# To test the docker container, you can copy the telemetry.py file into a running container.