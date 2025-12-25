import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router";
import AgentsTableSkeleton from "./components/skeleton";
import AgentsTable from "./components/table";

export default function Agent() {
  return (
     <PageContainer scrollable>
      <div className="w-full space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Voice Agents"
            description="Manage your voice AI agents and their configurations."
          />
          <Link to="/agents/create">
            <Button>
              <Plus className="h-4 w-4" />
              Create Agent
            </Button>
          </Link>
        </div>
        <Separator />
        <Suspense fallback={<AgentsTableSkeleton />}>
          <AgentsTable />
        </Suspense>
      </div>
    </PageContainer>
  )
}
