import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AgentForm from "./components/agent-form";

export default function AgentCreatePage() {
  return (
   <PageContainer scrollable>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex items-start justify-between">
          < Heading
            title="Create Voice Agent"
            description="Configure a new voice AI agent with LiveKit integration."
          />
        </div>
        <Separator />
        <AgentForm />
      </div>
    </PageContainer>
  )
}
