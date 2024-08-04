import { Link } from "gatsby";
import React, { useEffect } from "react";
import { themeChange } from 'theme-change'

export interface BlogOverviewEntryProps {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
  series?: string;
}

export default function BlogOverviewEntry({
  title,
  date,
  slug,
  description,
  tags,
  series,
}: BlogOverviewEntryProps) {
  return (
    <div className="card card-bordered card-compact">
      <div className="card-body">
        <div className="card-title">
          <h2 className="text-2xl">
            <Link to={slug}>
              {title}
            </Link>
          </h2>
        </div>
        <p className="text-sm text-gray-500 italic">{date}</p>
        <p className="text-lg">{description}</p>

        <div className="card-actions">
          {series && (
            <Link to={`/series/${series}`} className="badge badge-primary badge-lg">
              {series}
            </Link>
          )}

          {tags?.map((tag) => (
            <div key={tag} className="badge badge-outline badge-primary badge-lg">
              {"#" + tag}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}