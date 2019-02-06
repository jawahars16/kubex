# Go parameters
GOCMD=go
YARNCMD=yarn
DEPCMD=dep
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
DEP_ENSURE=$(DEPCMD) ensure
GO_TO_FRONTEND=cd frontend
YARNBUILD=$(YARNCMD) build
BINARY_NAME=kubex

build: 
				$(GO_TO_FRONTEND);$(YARNBUILD)
				$(GOBUILD) -o $(BINARY_NAME) -v
test: 
				$(GOTEST) -v ./...
clean: 
				$(GOCLEAN)
				rm -f $(BINARY_NAME)
run:
				$(GO_TO_FRONTEND);$(YARNBUILD)
				$(GOBUILD) -o $(BINARY_NAME) -v
				./$(BINARY_NAME)
deps:
				$(DEP_ENSURE)