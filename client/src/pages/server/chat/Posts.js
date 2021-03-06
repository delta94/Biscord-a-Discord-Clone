import React from "react";

import Post from "./Post";

const Posts = ({ posts, auth_token, currentChannel, serverId }) => {
    const divRef = React.useRef(null);

    React.useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [posts]);

    return (
        <div
            style={{
                flex: 300,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                justifyContent: "flex-end",
            }}
        >
            {posts ? (
                <>
                    {posts.map((post, index) =>
                        index > 0 ? (
                            <Post
                                key={post._id}
                                post={post}
                                prevOwner={posts[index - 1].owner}
                                auth_token={auth_token}
                                currentChannel={currentChannel}
                                serverId={serverId}
                            />
                        ) : (
                            <Post
                                key={post._id}
                                post={post}
                                prevOwner={null}
                                auth_token={auth_token}
                                currentChannel={currentChannel}
                                serverId={serverId}
                            />
                        )
                    )}
                    <div ref={divRef} />
                </>
            ) : (
                <p>The are no answers in this Channel</p>
            )}
        </div>
    );
};

export default Posts;
