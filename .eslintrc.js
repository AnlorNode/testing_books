module.exports = {
    extends: 'airbnb-base',
    rules: {
        'arrow-parens': [2, 'always'],
        'class-methods-use-this': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-console': ['error', { allow: ['warn', 'error', 'info', 'time', 'timeEnd'] }],
        'no-empty-function': ['error', { allow: ['constructors'] }],
        'no-useless-constructor': 'off',
        'max-len': ['error', { code: 120 }],
        indent: ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/no-useless-constructor': ['error'],
        'operator-linebreak': ['error', 'after'],
        'guard-for-in': 'off',
        'linebreak-style': 'off',
        'no-void': 'off',
        'no-param-reassign': 'off',
        'no-return-assign': 'off',
        'no-plusplus': 'off',
        'consistent-return': 'off',
        'no-continue': 'off',
        'no-unused-vars': 'off',
        'object-curly-newline': 'off',
        camelcase: 'off',
        'no-bitwise': 'off',
        'no-underscore-dangle': 'off',
        'implicit-arrow-linebreak': 'off',
        'prefer-object-spread': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],

        'no-restricted-syntax': [
            'error',
            {
                selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
                message: 'setTimeout must always be invoked with two arguments.',
            },
            {
                selector: "CallExpression[callee.name='setInterval'][arguments.length!=2]",
                message: 'setInterval must always be invoked with two arguments.',
            },
            'WithStatement',
        ],
    },
    overrides: [
        {
            files: ['**/*.ts'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    ignorePatterns: ['node_modules/', 'mt5/src/native_script', 'src/migrations'],
    globals: {
        window: true,
    },
    env: {
        node: true,
        mocha: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
};
