import { getAllFeedback } from "@/lib/firestore-admin";
// import { logger, formatObjectKeys } from '@/utils/logger';


export default async (req, res) => {
  try {
    const [siteId, route] = req.query.site
    const { feedback } = await getAllFeedback(siteId, route)

    res.status(200).json({ feedback });

  } catch (error) {
    // logger.error(
    //   {
    //     request: {
    //       headers: formatObjectKeys(req.headers),
    //       url: req.url,
    //       method: req.method
    //     },
    //     response: {
    //       statusCode: res.statusCode
    //     }
    //   },
    //   error.message
    // );
    console.log(error)
    res.status(500).json({ error })
  }
}

