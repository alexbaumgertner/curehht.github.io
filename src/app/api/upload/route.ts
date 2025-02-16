import { NextResponse, NextRequest } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'

import { getUserDataFromRequest } from '@/utils/getUserFromRequest'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  const userData = await getUserDataFromRequest(request)

  console.log('userData', userData)

  if (userData?.email !== 'alexbaumgertner@yandex.ru') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname
        /* clientPayload */
      ) => {
        console.log('pathname', pathname)

        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log('blob upload completed', blob, tokenPayload)

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          console.error('Error updating user', error)
          throw new Error('Could not update user')
        }
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    )
  }
}
