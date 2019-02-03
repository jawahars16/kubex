package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Prints the version of application",
	Long:  `Prints the version of application`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("1.0.0.0")
	},
}

func init() {
	RootCmd.AddCommand(versionCmd)
}
