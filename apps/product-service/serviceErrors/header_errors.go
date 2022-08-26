package serviceErrors

import "fmt"

type HeaderNotExists struct {
	HeaderName string
}

func (e HeaderNotExists) Error() string {
	return fmt.Sprintf("header '%v' does not exists", e.HeaderName)
}

type AddressParsingError struct {
	Address string
}

func (e AddressParsingError) Error() string {
	return fmt.Sprintf("owner address '%v' is not a valid ethereum address", e.Address)
}

type HashParsingError struct {
	Address string
}

func (e HashParsingError) Error() string {
	return fmt.Sprintf("asset hash '%v' is not a valid ethereum hash", e.Address)
}
