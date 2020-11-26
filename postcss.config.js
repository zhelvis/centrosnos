const config = {
  plugins: [
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.html', './src/**/*.js'],
          }),
          require('cssnano')({
            preset: 'default',
          }),
        ]
      : []),
  ],
}

module.exports = config
