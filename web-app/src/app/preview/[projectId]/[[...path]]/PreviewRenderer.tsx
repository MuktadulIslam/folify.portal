"use client";

import { COMPONENT_REGISTRY } from "@/components/lms";
import { ComponentInstance } from "@/types/builder";

interface PreviewRendererProps {
  components: ComponentInstance[];
}

export default function PreviewRenderer({ components }: PreviewRendererProps) {
  return (
    <main>
      {components
        .sort((a, b) => a.order - b.order)
        .map((instance) => {
          const registryEntry = COMPONENT_REGISTRY.find((r) => r.id === instance.componentId);
          if (!registryEntry) return null;

          const Component = registryEntry.component;
          return (
            <Component
              key={instance.instanceId}
              {...registryEntry.defaultProps}
              {...instance.props}
            />
          );
        })}
    </main>
  );
}
