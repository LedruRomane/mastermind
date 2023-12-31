########
# Help #
########

.DEFAULT_GOAL := help

MASTERMIND_HELP = \
	Usage: make [$(MASTERMIND_COLOR_INFO)command$(MASTERMIND_COLOR_RESET)] \
	$(call mastermind_help_section, Help) \
	$(call mastermind_help,help,This help)

define mastermind_help_section
	\n\n$(MASTERMIND_COLOR_COMMENT)$(strip $(1)):$(MASTERMIND_COLOR_RESET)
endef

define mastermind_help
  \n  $(MASTERMIND_COLOR_INFO)$(1)$(MASTERMIND_COLOR_RESET) $(2)
endef

help:
	@printf "\n$(MASTERMIND_HELP)"
	@awk ' \
		BEGIN { \
			sectionsName[1] = "Commands" ; \
			sectionsCount = 1 ; \
		} \
		/^[-a-zA-Z0-9_.@%\/+]+:/ { \
			if (match(lastLine, /^## (.*)/)) { \
				command = substr($$1, 1, index($$1, ":") - 1) ; \
				section = substr(lastLine, RSTART + 3, index(lastLine, " - ") - 4) ; \
				if (section) { \
					message = substr(lastLine, index(lastLine, " - ") + 3, RLENGTH) ; \
					sectionIndex = 0 ; \
					for (i = 1; i <= sectionsCount; i++) { \
						if (sectionsName[i] == section) { \
							sectionIndex = i ; \
						} \
					} \
					if (!sectionIndex) { \
						sectionIndex = sectionsCount++ + 1 ; \
						sectionsName[sectionIndex] = section ; \
					} \
				} else { \
					message = substr(lastLine, RSTART + 3, RLENGTH) ; \
					sectionIndex = 1 ; \
				} \
				if (length(command) > sectionsCommandLength[sectionIndex]) { \
					sectionsCommandLength[sectionIndex] = length(command) ; \
				} \
				sectionCommandIndex = sectionsCommandCount[sectionIndex]++ + 1; \
				helpsCommand[sectionIndex, sectionCommandIndex] = command ; \
				helpsMessage[sectionIndex, sectionCommandIndex] = message ; \
			} \
		} \
		{ lastLine = $$0 } \
		END { \
			for (i = 1; i <= sectionsCount; i++) { \
				if (sectionsCommandCount[i]) { \
					printf "\n\n$(MASTERMIND_COLOR_COMMENT)%s:$(MASTERMIND_COLOR_RESET)", sectionsName[i] ; \
					for (j = 1; j <= sectionsCommandCount[i]; j++) { \
						printf "\n  $(MASTERMIND_COLOR_INFO)%-" sectionsCommandLength[i] "s$(MASTERMIND_COLOR_RESET) %s", helpsCommand[i, j], helpsMessage[i, j] ; \
					} \
				} \
			} \
		} \
	' $(MAKEFILE_LIST)
	@printf "\n\n"
	@printf "$(if $(MASTERMIND_HELP_PROJECT),$(MASTERMIND_HELP_PROJECT)\n\n)"
.PHONY: help

help.project:
	@printf "$(if $(MASTERMIND_HELP_PROJECT),\n$(MASTERMIND_HELP_PROJECT)\n\n)"
