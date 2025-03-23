import React from 'react';
import DevStageDashboard from '@/components/DashboardComponent';
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { Suspense } from 'react';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

async function getContext() {
    const context = await createTRPCContext({
        headers: new Headers(),
    });
    const caller = createCaller(context);

    try {
        const [projectsData, tasksData] = await Promise.all([
            caller.project.getProjectsAssignedToUser(),
            caller.task.getTasksAssignedToUser()
        ]);
        return { projectsData, tasksData, error: null };
    } catch (error) {
        return { projectsData: [], tasksData: [], error };
    }
}

const Page = async () => {
    const {projectsData, tasksData} = await getContext();

    return (
        <div>
            <Suspense fallback={<DevStageDashboard projects={[]} tasks={[]} />}>
                <DevStageDashboard 
                    projects={projectsData ?? []} 
                    tasks={tasksData ?? []} 
                />
            </Suspense>
        </div>
    );
}

export default Page;
