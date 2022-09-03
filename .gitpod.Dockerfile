RUN true \
	&& apt-get update \
	&& apt-get install -y apt-utils \
	&& apt-get install -y \
		libcairo2-dev \
		libpango1.0-dev \
		node-nan \
		node-gyp \
		libjpeg-dev \
		libgif-dev \
		librsvg2-dev