##########
# Colors #
##########

MASTERMIND_COLOR_RESET   := \033[0m
MASTERMIND_COLOR_ERROR   := \033[31m
MASTERMIND_COLOR_INFO    := \033[32m
MASTERMIND_COLOR_WARNING := \033[33m
MASTERMIND_COLOR_COMMENT := \033[36m

######################
# Special Characters #
######################

# Usage:
#   $(call mastermind_message, Foo$(,) bar) = Foo, bar
#   $(call mastermind_message, $(lp)Foo bar) = (Foo bar
#   $(call mastermind_message, Foo$(rp) bar) = Foo) bar

, := ,
lp := (
rp := )

########
# Time #
########

# Usage:
#   $(call mastermind_time) = 11:06:20

define mastermind_time
`date -u +%T`
endef

###########
# Message #
###########

# Usage:
#   $(call mastermind_message, Foo bar)         = Foo bar
#   $(call mastermind_message_success, Foo bar) = (っ◕‿◕)っ Foo bar
#   $(call mastermind_message_warning, Foo bar) = ¯\_(ツ)_/¯ Foo bar
#   $(call mastermind_message_error, Foo bar)   = (╯°□°)╯︵ ┻━┻ Foo bar

define mastermind_message
	printf "$(MASTERMIND_COLOR_INFO)$(strip $(1))$(MASTERMIND_COLOR_RESET)\n"
endef

define mastermind_message_success
	printf "$(MASTERMIND_COLOR_INFO)(っ◕‿◕)っ $(strip $(1))$(MASTERMIND_COLOR_RESET)\n"
endef

define mastermind_message_warning
	printf "$(MASTERMIND_COLOR_WARNING)¯\_(ツ)_/¯ $(strip $(1))$(MASTERMIND_COLOR_RESET)\n"
endef

define mastermind_message_error
	printf "$(MASTERMIND_COLOR_ERROR)(╯°□°)╯︵ ┻━┻ $(strip $(1))$(MASTERMIND_COLOR_RESET)\n"
endef

#######
# Log #
#######

# Usage:
#   $(call mastermind_log, Foo bar)         = [11:06:20] [target] Foo bar
#   $(call mastermind_log_warning, Foo bar) = [11:06:20] [target] ¯\_(ツ)_/¯ Foo bar
#   $(call mastermind_log_error, Foo bar)   = [11:06:20] [target] (╯°□°)╯︵ ┻━┻ Foo bar

define mastermind_log
	printf "[$(MASTERMIND_COLOR_COMMENT)$(call mastermind_time)$(MASTERMIND_COLOR_RESET)] [$(MASTERMIND_COLOR_COMMENT)$(@)$(MASTERMIND_COLOR_RESET)] " ; $(call mastermind_message, $(1))
endef

define mastermind_log_warning
	printf "[$(MASTERMIND_COLOR_COMMENT)$(call mastermind_time)$(MASTERMIND_COLOR_RESET)] [$(MASTERMIND_COLOR_COMMENT)$(@)$(MASTERMIND_COLOR_RESET)] "  ; $(call mastermind_message_warning, $(1))
endef

define mastermind_log_error
	printf "[$(MASTERMIND_COLOR_COMMENT)$(call mastermind_time)$(MASTERMIND_COLOR_RESET)] [$(MASTERMIND_COLOR_COMMENT)$(@)$(MASTERMIND_COLOR_RESET)] " ;  $(call mastermind_message_error, $(1))
endef

###########
# Confirm #
###########

# Usage:
#   $(call mastermind_confirm, Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):
#   $(call mastermind_confirm, Bar foo, y) = ༼ つ ◕_◕ ༽つ Foo bar (Y/n):

define mastermind_confirm
	$(if $(CONFIRM),, \
		printf "$(MASTERMIND_COLOR_INFO) ༼ つ ◕_◕ ༽つ $(MASTERMIND_COLOR_WARNING)$(strip $(1)) $(MASTERMIND_COLOR_RESET)$(MASTERMIND_COLOR_WARNING)$(if $(filter y,$(2)),(Y/n),(y/N))$(MASTERMIND_COLOR_RESET): " ; \
		read CONFIRM ; \
		case $$CONFIRM in $(if $(filter y,$(2)), \
			[nN]$(rp) printf "\n" ; exit 1 ;; *$(rp) ;;, \
			[yY]$(rp) ;; *$(rp) printf "\n" ; exit 1 ;; \
		) esac \
	)
endef

################
# Conditionals #
################

# Usage:
#   $(call mastermind_error_if_not, $(FOO), FOO has not been specified) = (╯°□°)╯︵ ┻━┻ FOO has not been specified

define mastermind_error_if_not
	$(if $(strip $(1)),, \
		$(call mastermind_message_error, $(strip $(2))) ; exit 1 \
	)
endef

# Usage:
#   $(call mastermind_confirm_if, $(FOO), Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):

define mastermind_confirm_if
	$(if $(strip $(1)), \
		$(call mastermind_confirm, $(strip $(2)))
	)
endef

# Usage:
#   $(call mastermind_confirm_if_not, $(FOO), Foo bar) = ༼ つ ◕_◕ ༽つ Foo bar (y/N):

define mastermind_confirm_if_not
	$(if $(strip $(1)),, \
		$(call mastermind_confirm, $(strip $(2)))
	)
endef

##########
# Random #
##########

# Usage:
#   $(call mastermind_rand, 8) = 8th56zp2

define mastermind_rand
`cat /dev/urandom | LC_ALL=C tr -dc 'a-z0-9' | fold -w $(strip $(1)) | head -n 1`
endef
