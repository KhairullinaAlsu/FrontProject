import Link from 'next/link';
import useSWR from 'swr';
import { Assignment } from '../../Types/types';
import {FC} from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AssignmentList:FC = () => {
  const { data: assignments, error } = useSWR<Assignment[]>('/api/assignments', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!assignments) return <div>Loading...</div>;

  return (
      <div>
        {assignments.length === 0 ? (
            <div>
              <p>No assignments available. Please create a new assignments.</p>
              <Link href="/assignments/new">
                <button>Add New Assignments</button>
              </Link>
            </div>
        ) : (
            <div>
              {assignments.map((assignment) => (
                  <div key={assignment.id}>
                    <h2>{assignment.courseName}</h2>
                    <Link href={`/assignments/${assignment.id}`}>
                      <button>Show Details</button>
                    </Link>
                  </div>
              ))}
              <Link href="/assignments/new">
                <button>Add New Assignments</button>
              </Link>
            </div>
        )}
      </div>
  );
};

export default AssignmentList;
