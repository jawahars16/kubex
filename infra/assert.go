package infra

import (
	"fmt"
	"testing"
)

func AreStringEqual(t *testing.T, want, got string) {
	if got != want {
		t.Errorf("Expected : " + want + ". Got : " + got)
	}
}

func AreFloat64Equal(t *testing.T, want, got float64) {
	if got != want {
		t.Errorf("Expected : " + fmt.Sprintf("%f", want) + ". Got : " + fmt.Sprintf("%f", got))
	}
}
