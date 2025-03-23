import React from 'react';
import DevStageDashboard from '@/components/DashboardComponent';
import { Suspense } from 'react';
import {api} from '@/trpc/server';
import Loader from '@/components/Loader';
export const dynamic = 'force-dynamic';

const Page = async () => {
    void api.task.getTasksAssignedToUser.prefetch();
    void api.project.getProjectsAssignedToUser.prefetch();

    return (
        <div>
        <Suspense fallback={<Loader/>}>
          <DevStageDashboard/>
        </Suspense>
        </div>
    );
}

export default Page;
