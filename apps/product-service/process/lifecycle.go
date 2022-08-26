package process

import "sync"

var (
	// keeps track of running routines
	wg sync.WaitGroup
)

// Increment must be called by each in the background running routine
// that needs to finish before the program exists.
func Increment() {
	wg.Add(1)
}

// Decrement must be called by each routine that has previously called
// increment. It must be called for each call to Increment.
func Decrement() {
	wg.Done()
}

// Wait till all routines that are running have reported to be finished
// gracefully.
func Wait() {
	wg.Wait()
}
