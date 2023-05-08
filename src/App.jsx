import { useEffect, useState } from "react";
import "./App.css";
import Comment from "./Comments";
import uuid4 from "uuid4";

const comments = [
  {
    id: 1,
    comment: "This is the first comment",
    replies: [
      {
        id: 2,
        comment: "This is a reply to the first comment",
        replies: [],
      },
      {
        id: 3,
        comment: "Another reply to the first comment",
        replies: [
          {
            id: 4,
            comment: "A reply to the previous reply",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    comment: "This is the second comment",
    replies: [],
  },
  {
    id: 6,
    comment: "And this is the third comment",
    replies: [
      {
        id: 7,
        comment: "A reply to the third comment",
        replies: [],
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(comments);
  const [commentText, setCommentText] = useState("");

  const handleCommentText = (value) => {
    setCommentText(value);
  };

  const findParent = (parentID, defaultData) => {
    for (const comment of defaultData) {
      if (comment.id === parentID) {
        return comment;
      }

      const reply = findParent(parentID, comment.replies);
      if (reply) {
        return reply;
      }
    }
  };

  const addComment = (parentID, comment) => {
    setData((data) => {
      if (parentID === "root") {
        setCommentText("");
        return [{ comment, id: uuid4(), replies: [] }, ...data];
      } else {
        const parent = findParent(parentID, data);
        parent.replies = [
          { comment, id: uuid4(), replies: [] },
          ...parent.replies,
        ];
        return [...data];
      }
    });
  };

  const deleteComment = (parentID, commentID) => {
    setData((data) => {
      if (parentID === "root") {
        return data.filter((comment) => comment.id != commentID);
      } else {
        const parent = findParent(parentID, data);
        parent.replies = parent.replies.filter(
          (comment) => comment.id != commentID
        );
        return [...data];
      }
    });
  };

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <div>
      <main>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
            justifyContent: "flex-end",
            marginBottom: "2rem",
          }}
        >
          <input
            value={commentText}
            style={{
              all: "unset",
              outline: "1px solid gray",
              textAlign: "left",
              padding: "5px 8px",
              borderRadius: "4px",
              flex: "1 1 0",
            }}
            onChange={(e) => handleCommentText(e.target.value)}
          />
          <button
            style={{ fontWeight: "600" }}
            onClick={() => addComment("root", commentText)}
          >
            Comment
          </button>
        </div>
        {data.map((comment) => (
          <Comment
            data={comment}
            key={comment.id}
            parentID={"root"}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
