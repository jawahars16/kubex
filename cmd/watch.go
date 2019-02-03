package cmd

import (
	"fmt"
	"net/http"
	"os"

	"github.com/jawahars16/kubex/backend"
	"github.com/jawahars16/kubex/kube"
	"github.com/spf13/cobra"
)

var resource string
var port string
var namespace string
var allNamespaces bool

var supportedWatchers = map[string]func(ns string) func(w http.ResponseWriter, r *http.Request){
	"node":       backend.NodeHandler,
	"service":    backend.ServiceHandler,
	"deployment": backend.DeploymentHandler,
}

var watchCmd = &cobra.Command{
	Use:   "watch",
	Short: "Watch the state and resource of a particular kubernetes resource",
	Long:  `Watch the state and resource of a particular kubernetes resource`,
	Run: func(cmd *cobra.Command, args []string) {

		if len(args) <= 0 {
			fmt.Println("Error: 'watch' command required one argument.")
			os.Exit(1)
		}

		resource := args[0]
		if watcher, ok := supportedWatchers[resource]; ok {
			kube.InitializeClient()
			kube.InitializeMetricsClient()
			requestedNamespace := namespace
			if allNamespaces {
				requestedNamespace = ""
			}
			backend.Initialize(resource, watcher, fmt.Sprintf(":%s", port), requestedNamespace)
		} else {
			fmt.Printf("Requested resource [%s] not supported by kubex.", resource)
		}
	},
}

func init() {
	RootCmd.AddCommand(watchCmd)
	watchCmd.Flags().StringVar(&resource, "resource", "", "Resource to be watched like service, deployment, etc")
	watchCmd.Flags().StringVarP(&port, "port", "p", "8080", "The port where the application will be running.")
	watchCmd.Flags().StringVarP(&namespace, "namespace", "n", "default", "Watch the requested object(s) in specified namespace")
	watchCmd.Flags().BoolVarP(&allNamespaces, "all-namespaces", "A", false, "If present, watch the requested object(s) across all namespaces. Namespace in current context is ignored even if specified with --namespace.")
}
