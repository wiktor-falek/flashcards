import { ObjectId } from "mongodb";

export default function extract(arrayField, id) {
  return {
    $arrayElemAt: [
      {
        $filter: {
          input: arrayField,
          cond: { $eq: ["$$this._id", ObjectId(id)] },
        },
      },
      0,
    ],
  };
}