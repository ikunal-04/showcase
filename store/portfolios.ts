import { create } from 'zustand'
import { Portfolio } from '@/types/portfolios'
import { getPortfolio, uploadPortfolio } from '@/lib/actions/portfolio/server'

interface PortfolioStore {
    portfolios: Portfolio[];
    getPortfolios: () => void;
    addPortfolio: (portfolio: Portfolio) => Promise<void>;
}

export const usePortfoliosStore = create<PortfolioStore>(
    (set) => ({
        portfolios: [],
        getPortfolios: async () => {
            const portfoliosData = await getPortfolio();
            set({ portfolios: portfoliosData });
        },
        addPortfolio: async (portfolio: Portfolio) => {
            const portfoliosData = await uploadPortfolio(portfolio as Portfolio);
            set({ portfolios: [...usePortfoliosStore.getState().portfolios, portfoliosData as unknown as Portfolio] });
        }
    })
)