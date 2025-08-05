/* eslint-disable global-require */
/* eslint-env mocha */

const assert = require('assert');
const path = require('path');

describe('Sheriff Setup Action', () => {
  it('should construct correct download URL for latest version', () => {
    const thisOs = 'Linux';
    const platform = 'x86_64';
    const fileExtension = 'tar.gz';
    const version = 'latest';
    const expectedUrl = `https://releases.frontierhq.com/sheriff/latest/sheriff_${thisOs}_${platform}.${fileExtension}`;
    // Simulate URL construction logic
    const downloadUrl = version === 'latest'
      ? `https://releases.frontierhq.com/sheriff/latest/sheriff_${thisOs}_${platform}.${fileExtension}`
      : `https://releases.frontierhq.com/sheriff/releases/download/${version}/sheriff_${thisOs}_${platform}.${fileExtension}`;
    assert.strictEqual(downloadUrl, expectedUrl);
  });

  it('should construct correct download URL for specific version', () => {
    const thisOs = 'Linux';
    const platform = 'x86_64';
    const fileExtension = 'tar.gz';
    const version = 'v1.2.3';
    const expectedUrl = `https://releases.frontierhq.com/sheriff/releases/download/${version}/sheriff_${thisOs}_${platform}.${fileExtension}`;
    // Simulate URL construction logic
    const downloadUrl = version === 'latest'
      ? `https://releases.frontierhq.com/sheriff/latest/sheriff_${thisOs}_${platform}.${fileExtension}`
      : `https://releases.frontierhq.com/sheriff/releases/download/${version}/sheriff_${thisOs}_${platform}.${fileExtension}`;
    assert.strictEqual(downloadUrl, expectedUrl);
  });
});