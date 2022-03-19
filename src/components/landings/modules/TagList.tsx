import React from "react";
import { kebabCase } from "lodash";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Link } from "gatsby";
import TagIcon from "@mui/icons-material/Tag";

interface tagListsProps {
  tags?: string[];
  langKey: string;
}

const TagList = ({ tags, langKey }: tagListsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {tags &&
        tags.map((tag, i) => (
          <Link key={i} to={`/${langKey}/tags/${kebabCase(tag)}/`}>
            <Chip
              sx={{
                m: 1,
              }}
              icon={
                <TagIcon
                  style={{
                    color: "#308f96",
                  }}
                />
              }
              label={tag}
              size='small'
              clickable
            />
          </Link>
        ))}
    </Box>
  );
};

export default TagList;
