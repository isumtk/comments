import { useState } from "react";
import PropTypes from "prop-types";

const Comment = ({ data, addComment, deleteComment, parentID }) => {
  const [addNew, setAddNew] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handlePressReply = () => {
    if (addNew) {
      setAddNew(false);
      setCommentText("");
    } else {
      setAddNew(true);
    }
  };

  const { comment, replies } = data;

  const handelAddComment = () => {
    addComment(data.id, commentText);
    handlePressReply();
  };

  const handleDeleteComment = () => {
    deleteComment(parentID, data.id);
  };

  const handleCommentText = (value) => {
    setCommentText(value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          borderRadius: "6px",
          padding: "5px",
          border: "1px solid #101010",
          marginBottom: "5px",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "normal",
            color: "#101010",
            flex: "1 1 0",
            textAlign: "left",
          }}
        >
          {comment}
        </p>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={handlePressReply} style={{ fontWeight: "600" }}>
            {addNew ? "Cancel" : "Reply"}
          </button>
          <button onClick={handleDeleteComment} style={{ fontWeight: "600" }}>
            Delete
          </button>
        </div>
      </div>
      {addNew && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
            justifyContent: "flex-end",
            margin: "5px 0",
            outline: "1px solid gray",
            borderRadius: "4px",
            padding: "5px",
          }}
        >
          <input
            value={commentText}
            style={{
              all: "unset",
              background: "whitesmoke",
              textAlign: "left",
              padding: "5px 8px",
              borderRadius: "4px",
              flex: "1 1 0",
            }}
            onChange={(e) => handleCommentText(e.target.value)}
          />
          <div>
            <button style={{ fontWeight: "600" }} onClick={handelAddComment}>
              Post
            </button>
          </div>
        </div>
      )}
      {replies.length > 0 && (
        <div style={{ marginLeft: "2rem" }}>
          {replies.map((subcomment) => (
            <Comment
              data={subcomment}
              key={subcomment.id}
              parentID={data.id}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  data: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  parentID: PropTypes.string,
};

export default Comment;
