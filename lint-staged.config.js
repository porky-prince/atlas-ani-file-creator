module.exports = {
    '*.js': ['prettier --write', 'eslint --fix', 'git add'],
    '*.{json,md}': ['prettier --write', 'git add'],
};
