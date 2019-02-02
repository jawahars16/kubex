package infra

// type KubeClient interface {
// 	CoreV1() corev1.CoreV1Interface
// 	AppsV1beta2() corev1.Ap
// }

// Socket ...
type Socket interface {
	Write(message interface{})
}
