# Variables
VENV			= .venv
VENV_PYTHON		= $(VENV)/bin/python
VENV_ACTIVATE	= $(VENV)/bin/activate
SYSTEM_PYTHON	= $(or $(shell which python3), $(shell which python))
PYTHON			= $(or $(wildcard $(VENV_PYTHON)), $(SYSTEM_PYTHON))

# Build Venv

$(VENV_PYTHON):
	rm -rf $(VENV)
	$(SYSTEM_PYTHON) -m venv $(VENV)
	. $(VENV_ACTIVATE);\
	pip install --upgrade pip;
	pip install -r requirements.txt;

venv: $(VENV_PYTHON)
deps:
	. $(VENV_ACTIVATE);\
	pip install -r requirements.txt;

.PHONY: venv deps