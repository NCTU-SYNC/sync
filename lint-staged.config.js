function glob_escape(str) {
  return str.replace(/\[\]/, c => `[${c}]`);
}

module.exports = {
  '*.{js,jsx,ts,tsx}': fnames => {
    const escaped_fnames = fnames.map(glob_escape);

    const fnames_str         = fnames.join(' ');
    const escaped_fnames_str = escaped_fnames.join(' ');

    return [
      `eslint --fix ${fnames_str}`,
      `stylelint --fix ${escaped_fnames_str}`,
      `git add ${fnames_str}`
    ];
  }
};
