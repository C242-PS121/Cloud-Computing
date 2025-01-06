import { Storage } from '@google-cloud/storage'
import { HTTPException } from 'hono/http-exception'

const keyFilename = Bun.env.NODE_ENV === 'production' ? undefined : './.bucket.key.json'
const storage = new Storage({ keyFilename })

export async function upload(path: string, image: File): Promise<string> {
	const binary = new Uint8Array(await image.arrayBuffer())
	const file = storage.bucket(Bun.env.BUCKET_NAME).file(path)
	const public_url = decodeURIComponent(file.publicUrl())

	return new Promise((resolve, reject) => {
		file.save(binary, { contentType: image.type, resumable: false }, (err) => {
			if (err) reject(new HTTPException())
			resolve(public_url)
		})
	})
}
