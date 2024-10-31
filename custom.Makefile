custom:: help

COMPOSE=docker-compose

#==============================================================================
# Auto conf
#==============================================================================

configs/hubside-up.config.js:
	cp -n configs/hubside-up.config.json brand.config.json

.env:
	cp .env.dist .env

# @TODO trouver un moyen de copier le bon fichier de configuration (foriou, cyrana...)
autoconf: .env configs/hubside-up.config.json

#==============================================================================
# Shortcuts
#==============================================================================

hubside-up:
	yes | cp -f configs/hubside-up.config.json brand.config.json
	@$(COMPOSE) stop
	@$(COMPOSE) up -d

#==============================================================================
# Standard docker dev commands
#==============================================================================

## Stop all the containers
stop:
	@$(COMPOSE) stop
