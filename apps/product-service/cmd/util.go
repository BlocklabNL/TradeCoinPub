// utilities used by files in the package
package cmd

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/url"
	"os"
	"path"
	"syscall"
	"time"

	"github.com/BlocklabNL/TradeCoin/apps/product-service/config"
	"github.com/ethereum/go-ethereum/accounts/keystore"
	"github.com/ethereum/go-ethereum/common"
	"github.com/pkg/errors"
	"golang.org/x/term"
)

// loadAssetSignerKey reads in a keystore key file
// to be used in signing a transaction.
func loadAssetSignerKey(filepath string) (*keystore.Key, error) {

	contents, err := ioutil.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	keyPasswd, err := readPasswordFromPrompt()
	if err != nil {
		return nil, err
	}

	key, err := keystore.DecryptKey(contents, keyPasswd)
	if err != nil {
		return nil, err
	}

	return key, nil
}

// readPasswordFromPrompt prompts the user to
// type a password without echoing the input in the
// terminal. If no input is given, the password used
// will be the default string from the config.UploadKeyPass
// variable.
func readPasswordFromPrompt() (string, error) {

	fmt.Println("Enter Password (if default key is being used just press enter):")
	bytePassword, err := term.ReadPassword(syscall.Stdin)
	if err != nil {
		return "", errors.Wrap(err, "Problem reading password from prompt")
	}
	fmt.Println()

	var keyPasswd string
	if len(bytePassword) == 0 {
		keyPasswd = config.UploadKeyPass
	} else {
		keyPasswd = string(bytePassword)
	}

	return keyPasswd, nil

}

// getUnixTimeInFuture takes the current unix time
// and adds the input number of days to it.
func getUnixTimeInFuture(days uint) uint32 {
	return uint32(time.Now().AddDate(0, 0, int(days)).Unix())

}

// createUploadEndpoint generates the endpoint to upload an asset
// The URL is structured as follows: http://{location}/v2/asset/upload.
func createUploadEndpoint(location, version string, service string) *url.URL {
	u, err := url.Parse(location)

	if err != nil {
		return nil
	}
	u.Path = path.Join(u.Path, version, service)
	return u

}

// createFetchEndpoint creates the endpoint to fetch an asset.
// The URL is structured as follows: http://{location}/v2/asset/{ethAddress}/{assetHash}.
func createFetchEndpoint(location, version string, owner common.Address, asset common.Hash) *url.URL {
	u, err := url.Parse(location)

	if err != nil {
		return nil
	}
	u.Path = path.Join(u.Path, version, owner.Hex()[2:], asset.String()[2:])
	return u
}

// writeFile writes creates a new file in system given a name and
// copies the input from a buffer into the new file.
func copyWriteFile(fileName string, assedData io.ReadCloser) error {
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	_, err = io.Copy(file, assedData)
	if err != nil {
		return err
	}

	return nil
}
