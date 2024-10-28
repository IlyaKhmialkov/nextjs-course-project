import type { NextConfig } from 'next'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
	webpack: config => {
		config.resolve.alias['@colors'] = path.join(__dirname, 'src/constants/color.constants.scss')

		return config
	},
}

export default nextConfig
