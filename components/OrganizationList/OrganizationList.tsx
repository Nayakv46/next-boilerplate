import { useEffect, useMemo, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import Link from "next/link";
import PopoverWrapper from "@/components/ui/shadcn/PopoverWrapper";
import { useOrganizationsStore } from "@/lib/stores/organizationsStore";
import { Button } from "@/components/ui/shadcn/button";
import { GoPlusCircle } from "react-icons/go";
import { useGetAllOrganizations } from "@/hooks/useOrganizations";
import { showErrorToast } from "@/lib/toasts";

type CompanyChip = {
  id: string;
  name: string;
  to?: string;
  isAction?: boolean;
};

const OrganizationList = () => {
  const { organizationsState, setSelectedOrganizationId, setOrganizations } =
    useOrganizationsStore();
  const onGetAllOrganizationsSuccess = (data: any) => {
    setOrganizations(data);
  };

  const onGetAllOrganizationsError = () => {
    showErrorToast("Failed to update organization list");
  };

  const { data } = useGetAllOrganizations(
    onGetAllOrganizationsSuccess,
    onGetAllOrganizationsError,
  );

  const companies = useMemo<CompanyChip[]>(() => {
    return (data ?? [])?.map((organization) => ({
      id: organization.id,
      name: organization.name,
    }));
  }, [data]);

  const createOrganizationChip = useMemo<CompanyChip>(
    () => ({
      id: "create-organization",
      name: "Create Organization",
      to: "/create-organization",
      isAction: true,
    }),
    [],
  );

  const chipsWithCreate = useMemo<CompanyChip[]>(
    () => [...companies, createOrganizationChip],
    [companies, createOrganizationChip],
  );

  const selectedCompanyId =
    organizationsState.selectedOrganizationId ?? undefined;
  const selectedCompanyName =
    companies.find((company) => company.id === selectedCompanyId)?.name ??
    companies[0]?.name ??
    "No companies";

  const [visibleCompanies, setVisibleCompanies] =
    useState<CompanyChip[]>(chipsWithCreate);
  const [overflowCompanies, setOverflowCompanies] = useState<CompanyChip[]>([]);

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const moreMeasureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!companies.length) {
      if (selectedCompanyId) {
        setSelectedOrganizationId(undefined);
      }
      return;
    }

    const hasSelected = companies.some(
      (company) => company.id === selectedCompanyId,
    );
    if (!hasSelected) {
      setSelectedOrganizationId(companies[0].id);
    }
  }, [companies, selectedCompanyId, setSelectedOrganizationId]);

  useEffect(() => {
    const GAP_PX = 8;

    const calculateVisibleItems = () => {
      if (
        !chipsContainerRef.current ||
        !measureRef.current ||
        !moreMeasureRef.current
      ) {
        return;
      }

      const containerWidth = chipsContainerRef.current.clientWidth;
      const chipNodes = Array.from(
        measureRef.current.querySelectorAll<HTMLElement>(
          "[data-company-chip='true']",
        ),
      );
      const widths = chipNodes.map((node) => node.offsetWidth);
      const moreWidth = moreMeasureRef.current.offsetWidth;

      const countThatFits = (limit: number) => {
        let used = 0;
        let count = 0;

        for (const width of widths) {
          const next = count === 0 ? width : used + GAP_PX + width;
          if (next > limit) {
            break;
          }
          used = next;
          count += 1;
        }

        return count;
      };

      const fitWithoutMore = countThatFits(containerWidth);
      if (fitWithoutMore >= chipsWithCreate.length) {
        setVisibleCompanies(chipsWithCreate);
        setOverflowCompanies([]);
        return;
      }

      const limitWithMore = Math.max(0, containerWidth - moreWidth - GAP_PX);
      const fitWithMore = countThatFits(limitWithMore);

      setVisibleCompanies(chipsWithCreate.slice(0, fitWithMore));
      setOverflowCompanies(chipsWithCreate.slice(fitWithMore));
    };

    calculateVisibleItems();

    const observer = new ResizeObserver(calculateVisibleItems);

    if (chipsContainerRef.current) {
      observer.observe(chipsContainerRef.current);
    }

    window.addEventListener("resize", calculateVisibleItems);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, [chipsWithCreate]);

  const chipClass = (companyId: string) =>
    `px-4 py-2 h-10 text-sm rounded-md font-medium whitespace-nowrap transition-colors  ${
      selectedCompanyId === companyId
        ? "bg-[#3755F6] text-white"
        : "text-text-gray bg-transparent"
    }`;

  const hasSelectedInOverflow = overflowCompanies.some(
    (company) => company.id === selectedCompanyId,
  );

  return (
    <div className="flex items-center gap-4 justify-between w-full pb-4">
      <div className="flex items-center gap-2 shrink-0">
        <FaRegImage className="text-2xl" />
        <p className="text-xl font-semibold">{selectedCompanyName}</p>
      </div>

      <div
        ref={chipsContainerRef}
        className="flex items-center justify-end gap-2 flex-1 min-w-0"
      >
        {visibleCompanies.map((company) =>
          company.isAction && company.to ? (
            <Button
              key={company.to}
              className="px-4 py-2 h-10 text-sm rounded-md font-medium whitespace-nowrap"
            >
              <Link href={company.to} className="flex items-center gap-2">
                <GoPlusCircle className="size-5" />
                {company.name}
              </Link>
            </Button>
          ) : (
            <Button
              key={company.id}
              onClick={() => setSelectedOrganizationId(company.id)}
              className={chipClass(company.id)}
            >
              {company.name}
            </Button>
          ),
        )}

        {overflowCompanies.length > 0 ? (
          <PopoverWrapper
            trigger={
              <span
                className={`flex px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap transition-colors ${
                  hasSelectedInOverflow
                    ? "bg-[#3755F6] text-white"
                    : "text-text-gray border border-[#E5E7EB]"
                }`}
              >
                More ({overflowCompanies.length})
              </span>
            }
            description={
              <div className="flex flex-col">
                {overflowCompanies.map((company) =>
                  company.isAction && company.to ? (
                    <Button key={company.id} className="px-3 py-2 text-sm">
                      <Link href={company.to}>{company.name}</Link>
                    </Button>
                  ) : (
                    <Button
                      key={company.id}
                      onClick={() => setSelectedOrganizationId(company.id)}
                      className={`px-3 py-2 text-sm transition-colors ${
                        selectedCompanyId === company.id
                          ? "bg-[#3755F6] text-white"
                          : "text-foreground bg-transparent hover:bg-accent"
                      }`}
                    >
                      {company.name}
                    </Button>
                  ),
                )}
              </div>
            }
            className="w-max p-0 min-w-44 overflow-hidden"
          />
        ) : null}
      </div>

      <div
        ref={measureRef}
        className="fixed -left-[9999px] top-0 invisible pointer-events-none whitespace-nowrap"
      >
        {chipsWithCreate.map((company) => (
          <span
            key={company.id}
            data-company-chip="true"
            className={
              company.isAction
                ? "px-4 py-2 h-10 text-sm rounded-md font-medium whitespace-nowrap"
                : chipClass(company.id)
            }
          >
            {company.name}
          </span>
        ))}
        <span
          ref={moreMeasureRef}
          className="px-4 py-2 text-sm rounded-md font-medium whitespace-nowrap text-text-gray border border-[#E5E7EB]"
        >
          More (99)
        </span>
      </div>
    </div>
  );
};

export default OrganizationList;
