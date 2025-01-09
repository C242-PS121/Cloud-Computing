import { S3Client } from "bun";
import { HTTPException } from 'hono/http-exception'

const endpoint = "https://storage.googleapis.com"
const bucket = Bun.env.BUCKET_NAME

enum Folder {
	Images = 'clothing',
	// for future use
}

const gcs = new S3Client({
	accessKeyId: Bun.env.S3_ACCESS_KEY_ID,
	secretAccessKey: Bun.env.S3_SECRET_ACCESS_KEY,
	endpoint,
	bucket
})

export async function upload(dest: `${Folder}/${string}`, image: File) {
	const file = gcs.file(dest)
	const public_url = `${endpoint}/${bucket}/${dest}`

	await file.write(image).catch(e => {
		throw new HTTPException()
	})

	return public_url
}