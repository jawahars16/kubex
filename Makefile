# Go parameters
GOCMD=go
YARNCMD=yarn
DEPCMD=dep
BINARY_NAME=kubex

GO_BUILD=$(GOCMD) build
GO_CLEAN=$(GOCMD) clean
GO_TEST=$(GOCMD) test
GO_GET=$(GOCMD) get
DEP_ENSURE=$(DEPCMD) ensure
GO_TO_FRONTEND=cd frontend
YARN_BUILD=$(YARNCMD) build
YARN_TEST=$(YARNCMD) test

default: test build
build: 
				$(GO_TO_FRONTEND);$(YARN_BUILD)
				$(GO_BUILD) -o $(BINARY_NAME) -v
test: 
				$(GO_TO_FRONTEND);CI=true $(YARN_TEST)
				$(GO_TEST) -v ./...
clean: 
				$(GO_CLEAN)
				rm -f $(BINARY_NAME)
run:
				$(GO_TO_FRONTEND);$(YARN_BUILD)
				$(GO_BUILD) -o $(BINARY_NAME) -v
				./$(BINARY_NAME)
deps:
				$(DEP_ENSURE)