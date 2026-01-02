import { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { AnalysisLevelSelector } from "@/components/AnalysisLevelSelector";
import { OptionSelector } from "@/components/OptionSelector";

type AnalysisLevel = "plan" | "industry" | "subscription" | null;

const PriceChange = () => {
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  
  const SUBSCRIPTION_IDS = [
    'S-3fbf9e','S-585d4c','S-7f9ce5','S-0bdbb3','S-2e965d','S-761518','S-dcae52','S-ebfbbe','S-66f0d0','S-e05ab8','S-2c52b6','S-769f70','S-8985d3','S-3ea3af','S-7820a5','S-9eeb7e','S-b69fa2','S-c2c197','S-f967c2','S-18b1f9','S-7c1eb7','S-9b96c2','S-020222','S-52119f','S-74a274','S-9e15d0','S-a408fe','S-d91908','S-f45fe3','S-f95951','S-2a312e','S-c77f0c','S-cc80ee','S-519f1c','S-9ea111','S-bc5908','S-c8fd93','S-c3472f','S-19465f','S-574b52','S-65491f','S-6da42f','S-9de4eb','S-54b286','S-601bbe','S-fe753c','S-056af2','S-3d58c6','S-3f82f4','S-41ea32','S-606d6d','S-62c088','S-8a37c8','S-9b8167','S-cfbb85','S-d26bbf','S-5a1fc3','S-672dd6','S-81e9f1','S-eb84b1','S-3a57be','S-42f3be','S-597873','S-d02277','S-16486d','S-510009','S-7fa78f','S-c9da7a','S-e62fc9','S-03a5b0','S-2ec763','S-3199cf','S-4690b3','S-6d6bde','S-76767f','S-80632f','S-d747bc','S-9c6bd0','S-c6287d','S-ce7c30','S-d93967','S-da7360','S-e05562','S-1e1853','S-292c06','S-5bb13f','S-a83bf1','S-101401','S-6b534f','S-7f219a','S-8e3b74','S-39a5a7','S-5f4afc','S-7d4240','S-a67bb7','S-0e43ee','S-106bf6','S-8055fa','S-a18bb2','S-0337da','S-27c993','S-5521f5','S-8dd1f6','S-9a8646','S-daf6aa','S-22eb3c','S-3b98b1','S-45baa6','S-897d69','S-d6106b','S-f32440','S-f615d2','S-fc7e8e','S-c62bb7','S-d8c527','S-52385a','S-88d746','S-b89305','S-f97537','S-196e49','S-246942','S-3236ee','S-a69aed','S-b35b20','S-b81c97','S-1fabe5','S-33df6f','S-f9a56a','S-3f48a5','S-486088','S-658bcb','S-bd1912','S-d29575','S-ff2761','S-4fd561','S-73fc8f','S-8ae804','S-c0a7d8','S-e92512','S-0b25d7','S-3ca6d2','S-604bd0','S-9395a2','S-d6dc7a','S-5eaab8','S-695606','S-7ded4d','S-c284ce','S-d735d1','S-db6454','S-dcbf45','S-0c43c2','S-1c54b6','S-71c67c','S-d5aded','S-e11cde','S-f09b6c','S-fe2139','S-126e7e','S-c10f0c','S-e9b437','S-2dad6b','S-457217','S-59f0a6','S-7c81dd','S-9ee11d','S-b2238e','S-d83789','S-020dce','S-6eb56d','S-b4212b','S-4a89a7','S-bff3b5','S-e71203','S-0b73bd','S-2c64e6','S-2ff628','S-7452a4','S-9cb1f7','S-a4d121','S-b9bbfd','S-d7163c','S-05eff5','S-2c1ca6','S-af6536','S-b89456','S-05ad41','S-46ff9c','S-80c24c','S-4c5456','S-a54381','S-909612','S-c033fa','S-f24609','S-628729','S-7826c1','S-804965','S-9af385','S-a63da6','S-bc66af','S-e1fa5b','S-ffd591','S-3ad334','S-4dae4c','S-61c27e','S-6cea1b','S-e2fd71','S-45ee20','S-ccc0fe','S-f2da7f','S-3c9178','S-4c7591','S-65dbf3','S-9c1bcb','S-a4b1af','S-d19216','S-85f2ab','S-8b0498','S-e9395e','S-fa05d7','S-021004','S-23ae3c','S-450fa9','S-d11e9f','S-fec1cd','S-198dbe','S-429220','S-74f146','S-e854de','S-846d41','S-dc1cf4','S-e95f57','S-fee7b2','S-0c0691','S-44f453','S-4815a3','S-54e8b2','S-66569a','S-d106d4','S-3829dc','S-5bbfe3','S-c17a35','S-ea2c98','S-0d33fc','S-7f04ec','S-b2f038','S-06770c','S-396a83','S-94fa70','S-af430c','S-d91f4c','S-dd3b36','S-35cf1c','S-412125','S-523cce','S-80016a','S-86455a','S-45baac','S-497d95','S-5619af','S-f1778c','S-1c5650','S-3bb329','S-6def60','S-7c5f3b','S-ed76ff','S-127d0b','S-1d15a7','S-9b5676','S-1a20b6','S-e9a159','S-ed75af','S-329803','S-da7f1f','S-fccc09','S-a2f231','S-d26ee3','S-dacbda','S-ddf5ff','S-e3b379','S-f690e0','S-768196','S-96fb48','S-eb8b81','S-008cab','S-36b46e','S-93592e','S-bff8c5','S-f703bd','S-b95c5c','S-bedd26','S-d2a604','S-1ade0b','S-2f0815','S-3c853b','S-455183','S-5d6528','S-7f5d03','S-ca6962','S-eed91a','S-335e1e','S-a892fd','S-a91e0c','S-e7e013','S-fe910d','S-6587d8','S-c899a3','S-d57a67','S-fe6eb1','S-162441','S-79b2bc','S-c067fc','S-c6d8ce','S-c83dfd','S-3da8ee','S-47e122','S-c3c85e','S-1cff18','S-5eb846','S-a805a5','S-bcbe03','S-78554e','S-a2ee32','S-a64940','S-5ae105','S-dec1fb','S-1e3a06','S-21eeea','S-4311fb','S-abd9be','S-073381','S-104053','S-223221','S-6c6e91','S-720940','S-c68e80','S-5aa4ba','S-83b708','S-875645','S-b95aac','S-b9fe85','S-1218fd','S-65e749','S-6e0386','S-f783b6','S-3bd427','S-5fea89','S-bfd04c','S-1e349b','S-3d7bed','S-7ce677','S-b78829','S-d4d459','S-faa8ec','S-3c87b4','S-ae1278','S-cb5020','S-eaa2c2','S-feaca1','S-7fbc53','S-d396d1','S-e6513c','S-eb15a1','S-f73a84','S-54d8cf','S-dc3e11','S-0ae114','S-82a7dd','S-8b24a0','S-a18ab0','S-1f93cd','S-239a39','S-3128b4','S-e36ccb','S-e371b7','S-70cc83','S-b45a10','S-08c8e1','S-12bfc8','S-a68d25','S-c5cee8','S-2ebd06','S-a4f26d','S-0a59be','S-22778a','S-24ae40','S-31090f','S-5a94f7','S-8faa60','S-579a24','S-5ed35a','S-856241','S-632acf','S-05b1b6','S-d22c1d','S-fd8bb6','S-6fa5cd','S-2d807a','S-694277','S-6b0789','S-f36371','S-f8e091','S-fc6cb4','S-20a297','S-31cec4','S-64d8c9','S-03ac49','S-22be2c','S-374628','S-6a02fe','S-c5d797','S-dc2418','S-de059a','S-f00f7e','S-078c2b','S-8fd22d','S-3bdedd','S-447189','S-775dd1','S-ab152e','S-b1d153','S-bf39f7','S-efdeae','S-3bb28f','S-6403db','S-969aac','S-c2168a','S-e6f639','S-12902a','S-3d46f8','S-7d8dde','S-81caea','S-9bf1a0','S-3ae8d8','S-467918','S-58d17c','S-67c2c9','S-d18856','S-76b964','S-049328','S-0c03b0','S-233c23','S-6904e6','S-d7497b','S-dd73ac','S-fb4fae','S-4c8ab8','S-c57c91','S-cdd281','S-df0314','S-0f15b7','S-6e177f','S-8106d9','S-9cca23','S-b15faf','S-d1f12e','S-02d6c8','S-078e94','S-235670','S-4eef1a','S-a3b329','S-c9d323','S-067c38','S-224bca','S-70cf3c','S-cccce3','S-e3165d','S-ff582b','S-2f729b','S-3cc641','S-64acb8','S-ca98c9','S-e2c20a','S-2214c6','S-4ad7b1','S-8cec59','S-e6b35a','S-e9737c','S-491d53','S-879b43','S-dbceba','S-f981fe','S-2f7250','S-b32a70','S-dc7143','S-154119','S-527b39','S-5a18e5','S-74e211','S-27514e','S-86ed20','S-d1fb2e','S-07a006','S-11939f','S-79c82e','S-a0c741','S-c18476','S-12a13c','S-934f6d','S-a25d8b','S-ecefa1','S-f5fcc9','S-293a1f','S-4afb53','S-4cd678','S-668cdc','S-94c6a5','S-cd4d67','S-2b2532','S-af6f53','S-0a3e58','S-38eb77','S-6f04a4','S-82db05','S-9220c9','S-9f4914','S-ac42e8','S-e958ba','S-0d8293','S-12ca50','S-2196c4','S-25f647','S-77f7fd','S-b45bc6','S-f7f6d7','S-59edf9','S-5aea91','S-b520e9','S-1dbbc2','S-381420','S-c58d66','S-d224a1','S-a3cbd4','S-26dbbf','S-34b845','S-377ced','S-e78857','S-0a765d','S-83ee75','S-ea3d54','S-df262a','S-fa8c75','S-150c71','S-4236fa','S-8cc2e2','S-8e701b','S-9acc7f','S-f09511','S-166024','S-2991c7','S-851743','S-87d801','S-af1def','S-b6c0a0','S-c9b181','S-d1a6c6','S-fa92c5','S-869978','S-bdac36','S-c6ff41','S-e86a94','S-41128b','S-453f00','S-6ce794','S-ec0efa','S-3a6a71','S-53fa80','S-718116','S-cce34b','S-18565e','S-479d9a','S-381917','S-7eb81c','S-80f65d','S-e76552','S-2c5e1c','S-430691','S-951053','S-9842bb','S-cd6d68','S-cf12f4','S-db7c1d','S-ac8fd3','S-22c66b','S-da0a69','S-db4e11','S-dbee03','S-e77144','S-ee994a','S-5a6941','S-5d729e','S-8db104','S-fee60b','S-0abdec','S-7262b9','S-79535e','S-86bcda','S-e133a5','S-e7de53','S-f6b264','S-70b1cf','S-79af01','S-c86cb0','S-0efc9b','S-1da72c','S-70c369','S-a9bfe0','S-2aaa9c','S-2ddb46','S-307e49','S-60cb51','S-9eb13e','S-a801d1','S-e2793d','S-54283b','S-62641a','S-d2e00a','S-e2799b','S-e32b34','S-911e27','S-d322a2','S-f1826f','S-1ad9cb','S-200752','S-24631a','S-8dd1cf','S-9161b0','S-924925','S-a14c42','S-c9b0cc','S-f6e116','S-041534','S-102053','S-d0259a','S-02ab8b','S-07399c','S-c8a3f6','S-cdd00a','S-ed4c45','S-4193dd','S-4e4b10','S-503afa','S-5fffe8','S-61bcfb','S-183502','S-206227','S-21e372','S-2d63e2','S-51f213','S-539566','S-a87ff6','S-7d651b','S-804a70','S-c1164e','S-d88f58','S-eb23dd','S-1876fb','S-1c7a41','S-7db513','S-7f92bd','S-d9ad28','S-f2e134','S-2d5c04','S-5a75eb','S-78ffdd','S-9a6596','S-b10cfa','S-cfa635','S-d97fa8','S-14b7f3','S-573f93','S-7fc49b','S-80199e','S-8921cb','S-c2701b','S-2f2ba3','S-44a7c3','S-495d33','S-6bf118','S-e21910','S-1fddda','S-3d8c2f','S-cb7ea9','S-47b86b','S-a33656','S-dee62f','S-26a630','S-6bd42d','S-7252b5','S-991f61','S-f973d4','S-1a2fbc','S-87db32','S-dcc084','S-ee30bb','S-39a8f1','S-5698bd','S-e8488d','S-f8e69c','S-11d922','S-4c2f78','S-5daabf','S-9bf16e','S-d97c5f','S-ed7a72','S-317bed','S-559e85','S-7f8cd8','S-e781ba','S-1f2b1a','S-246f9c','S-4bfab2','S-88bc66','S-c9f8c1','S-0a7396','S-1ccdd4','S-54bb4e','S-5717da','S-76b06c','S-0fa88d','S-36d5c9','S-875cf3','S-a7524a','S-eea643','S-214edb','S-4781b1','S-8bac4e','S-c8d680','S-d7ef67','S-0a8acf','S-19edee','S-80fa36','S-da8d5f','S-0cb4fe','S-1bc5a4','S-5d299e','S-899319','S-a603dd','S-d3f138','S-c7190f','S-c8fa77','S-e98121','S-3dc46b','S-eabe72','S-150c8e','S-310ae0','S-3503b4','S-46852c','S-58ab69','S-dbb8b9','S-f44c76','S-150930','S-404ecd','S-73d0eb','S-810a67','S-86615c','S-a4d69d','S-652885','S-85eb8f','S-b6a35b','S-b784a1','S-c13970','S-0ba1fe','S-4a8ce0','S-ac2157','S-e71f4a','S-0144ac','S-2223bf','S-704cf3','S-75cba6','S-93f835','S-d8fa45','S-e04d93','S-20812a','S-4fdfa3','S-1c643d','S-28e7bf','S-62c98f','S-6895d0','S-7a06fe','S-bdd4c5','S-d7e65d','S-e25e6e','S-ef3aa2','S-6e0006','S-9b493e','S-ad31b0','S-269b4a','S-527d18','S-62aa3c','S-e36786','S-f0c747','S-02cde8','S-204d42','S-2fed82','S-396a84','S-969c1d','S-b04174','S-c85c63','S-da3b68','S-f2be88','S-240a09','S-6bd30a','S-a1901c','S-e740b4','S-8e5be7','S-916876','S-b7ef4c','S-31be9c','S-8d89a8','S-9c8d9e','S-a01aad','S-648397','S-e1081c','S-15582c','S-27e42e','S-5f1d80','S-600e05','S-6630bc','S-de9b4b','S-e3255c','S-277111','S-3b7f8e','S-66ffe0','S-7018bf','S-b27c2f','S-c4c9ce','S-2c4909','S-3bb8a2','S-4c8e19','S-718f18','S-dbf124','S-f41a31','S-21393c','S-26bf58','S-2fc8fa','S-6f75be','S-f9b1d0','S-606747','S-a25ed2','S-b7deea','S-c2eeba','S-f2b79f','S-71827b','S-dd85c4','S-f4dbc7','S-021985','S-abd244','S-b465a7','S-e5c35c','S-e88276','S-28d64b','S-58b1a2','S-a707da','S-b6e15a','S-d604ec','S-18f498','S-7ea5d9','S-f74ac6','S-041624','S-16fb78','S-38a5fb','S-6b1de8','S-ad32a8','S-3112d0','S-367d84','S-401496','S-befdf1','S-c89bff','S-fc8f09','S-14a685',
  ];
  const [priceChangePct, setPriceChangePct] = useState<number>(5);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisLevelChange = (level: AnalysisLevel) => {
    setAnalysisLevel(level);
    setSelectedOption(null);
    setResult(null);
    setError(null);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    setSubscriptionId(null);
    setResult(null);
    setError(null);
  };

  const handleSubscriptionIdChange = (id: string) => {
    setSubscriptionId(id);
    setSelectedOption(null);
    setResult(null);
    setError(null);
  };

  const handleSimulate = async () => {
    if (!analysisLevel) return;
    if (analysisLevel === "subscription" && !subscriptionId) return;
    if (analysisLevel !== "subscription" && !selectedOption) return;

    setIsSimulating(true);
    setError(null);
    setResult(null);

    try {
      const pct = Math.max(-10, Math.min(10, priceChangePct));

      const body: any = {
        analysisLevel,
        priceChangePct: pct,
      };

      if (analysisLevel === "subscription") {
        body.subscriptionId = subscriptionId;
      } else {
        body.selection = selectedOption;
      }

      const res = await fetch("https://pome-backend.onrender.com/simulate-price-change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `API error: ${res.status}`);
      }

      const data = await res.json();
      const expected = data?.expectedChurnChangePct;
      if (expected === undefined) throw new Error("Response missing expectedChurnChangePct");
      setResult(Number(expected));
    } catch (err: any) {
      setError(err.message || "Failed to simulate price change");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    setAnalysisLevel(null);
    setSelectedOption(null);
    setPriceChangePct(5);
    setResult(null);
    setError(null);
  };

    const canSimulate = Boolean(
      analysisLevel &&
      !isSimulating &&
      ((analysisLevel === "subscription" && subscriptionId) || (analysisLevel !== "subscription" && selectedOption))
    );

  return (
    <div className="min-h-screen bg-background bg-mesh">
      <Header />

      <main className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Simulate Price Change</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Analyze how a price change affects churn, revenue and elasticity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto executive-card-elevated space-y-8">
          <AnalysisLevelSelector
            selected={analysisLevel}
            onSelect={handleAnalysisLevelChange}
          />

          {analysisLevel && analysisLevel !== "subscription" && (
            <div className="pt-6 border-t border-border/30">
              <OptionSelector
                analysisLevel={analysisLevel}
                selected={selectedOption}
                onSelect={handleOptionChange}
              />
            </div>
          )}

          {analysisLevel && (
            <div className="pt-6 border-t border-border/30 space-y-4">
              {/* Subscription input */}
              {analysisLevel === "subscription" && (
                <div>
                  <label className="text-sm text-muted-foreground">Subscription ID</label>
                  <select
                    value={subscriptionId ?? ""}
                    onChange={(e) => handleSubscriptionIdChange(e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-input rounded-md"
                  >
                    <option value="">Select subscription ID</option>
                    {SUBSCRIPTION_IDS.map((id) => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                  <div className="text-xs text-muted-foreground mt-1">Choose a subscription ID from the list.</div>
                </div>
              )}

              {/* Price slider (shown for all analysis levels) */}
              <div>
                <label className="text-sm text-muted-foreground">Price Change (%)</label>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={priceChangePct}
                    onChange={(e) => setPriceChangePct(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="w-20 text-right font-medium">{priceChangePct}%</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Negative values decrease price, positive increase.</div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSimulate}
                  disabled={!canSimulate}
                  className="btn-primary-executive group"
                >
                  {isSimulating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Simulate</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    </>
                  )}
                </button>

                <button onClick={handleReset} className="btn-secondary-executive">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

              {result !== null && (
                <div className="bg-card p-6 rounded-md text-center">
                  <h3 className="font-semibold mb-2">Expected Change in Churn Probability</h3>
                  <p className="text-2xl font-bold text-accent">{result.toFixed(3)}%</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PriceChange;
